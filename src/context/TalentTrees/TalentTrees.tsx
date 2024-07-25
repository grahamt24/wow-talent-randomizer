import React, { useState, useEffect } from "react";
import axios from "axios";
import { retrieveAccessToken } from "../../api/BlizzardAPI/retrieveAccessToken";
import { CLASSES } from "../../api/WorldOfWarcraftClasses/constants";
import { ResponseData } from "../../api/BlizzardAPI/types";
import { TalentTrees } from "./types";
import { TalentTreesContext } from "./constants";

const TalentTreesProvider = ({ children }: { children: React.ReactNode }) => {
  const [talentTrees, setTalentTrees] = useState<TalentTrees>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllTalentTrees = async () => {
      const storedTalentTrees = localStorage.getItem("talentTreesData");
      if (storedTalentTrees) {
        setTalentTrees(JSON.parse(storedTalentTrees));
        setLoading(false);
        return;
      }
      const accessToken = await retrieveAccessToken();

      const requests = CLASSES.flatMap((wowClass) =>
        wowClass.specs.map((spec) =>
          axios.get<ResponseData>(
            encodeURI(
              `https://us.api.blizzard.com/data/wow/talent-tree/${wowClass.talentTreeId}/playable-specialization/${spec.id}?namespace=static-us&locale=en_US&access_token=${accessToken}`
            )
          )
        )
      );

      const talentTreesData: TalentTrees = {};

      const responses = await Promise.all(requests);
      responses.forEach((res) => {
        const { data } = res;
        const { playable_class, playable_specialization } = data;
        talentTreesData[playable_class.id] = {
          ...talentTreesData[playable_class.id],
          [playable_specialization.id]: data,
        };
      });

      localStorage.setItem("talentTreesData", JSON.stringify(talentTreesData));
      setTalentTrees(talentTreesData);
      setLoading(false);
    };

    fetchAllTalentTrees();
  }, []);

  return (
    <TalentTreesContext.Provider value={{ talentTrees, loading }}>
      {children}
    </TalentTreesContext.Provider>
  );
};

export { TalentTreesProvider };
