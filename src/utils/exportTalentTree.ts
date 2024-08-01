import { TalentNode } from "../api/BlizzardAPI/types";
import { TalentTrees } from "../context/TalentTrees/types";

/**
 * See https://github.com/tomrus88/BlizzardInterfaceCode/blob/master/Interface/AddOns/Blizzard_PlayerSpells/ClassTalents/Blizzard_ClassTalentImportExport.lua
 * This comment explains how the base64 string is constructed for exporting talents
 * As of 7/30/2024, this is not working and I'm not sure how to get it to work. I've tried lots of debugging and reverse engineering but I can't figure it out.
 */
async function exportTalentTree(
  talentNodes: TalentNode[],
  specializationId: number
): Promise<string> {
  const bitStream: number[] = [];

  // HEADER
  const serializationVersion = 8; // Taken from wowhead's code. The GetLoadoutSerializationVersion Blizz uses says it's 2, but 2 gives an error when attempting to import
  bitStream.push(...toBits(serializationVersion, 8));
  bitStream.push(...toBits(specializationId, 16));
  bitStream.push(...Array(128).fill(0));
  console.log(bitsToBytes(bitStream));

  // FILE CONTENT
  const allTalentTrees = getTree(specializationId);
  allTalentTrees.forEach((node) => {
    const talentNode = talentNodes.find((tn) => tn.id === node.id);
    if (talentNode) {
      if (talentNode.isDefaultNode) {
        bitStream.push(1); // Is Node Selected
        bitStream.push(0);
      } else if (talentNode.rank > 0) {
        bitStream.push(1); // Is Node Selected
        bitStream.push(1); // Is Node Purchased
        bitStream.push(talentNode.rank < talentNode.totalRanks ? 1 : 0); // Is Partially Ranked
        if (talentNode.rank < talentNode.totalRanks) {
          bitStream.push(...toBits(talentNode.rank, 6)); // Ranks Purchased
        }
        bitStream.push(node.choiceNode ? 1 : 0); // Is Choice Node
        if (node.choiceNode) {
          bitStream.push(...toBits(talentNode.choiceIndex, 2)); // Choice Entry Index
        }
      } else {
        bitStream.push(0); // Is Node Selected
      }
    } else {
      bitStream.push(0); // Is Node Selected
    }
  });

  // Convert bit stream to byte array
  const byteArray = bitsToBytes(bitStream);
  console.log(byteArray);

  console.log(btoa(String.fromCharCode(...byteArray)));

  // Convert byte array to base64 string
  return btoa(String.fromCharCode(...byteArray));
}

/**
 * This function must get ALL talents in the trees, regardless of the selected spec, then sort in ascending order based off the following comment from blizzard code
 * -- The order of the nodes is determined by C_Traits.GetTreeNodes API.
 * It returns all nodes for a class tree, including nodes from all class specializations, ordered in ascending order by the nodeID.
 * Only nodes from the specID defined in the header should be marked as selected for this loadout.
 */
function getTree(specId: number) {
  const storedTalentTrees = localStorage.getItem("talentTreesData");
  const talentTrees = JSON.parse(storedTalentTrees || "{}") as TalentTrees;
  let classId: number | undefined;

  // Find the classId for the given specId
  for (const [key, specs] of Object.entries(talentTrees)) {
    if (specs[specId]) {
      classId = parseInt(key);
      break;
    }
  }

  if (classId === undefined) {
    throw new Error(`Class ID for spec ID ${specId} not found.`);
  }

  // Combine talents for the current spec and all specs for that class
  const filteredTalents = Object.values(talentTrees[classId]).flatMap(
    (spec) => {
      if (spec.playable_specialization.id === specId) {
        return [...spec.spec_talent_nodes, ...spec.class_talent_nodes];
      }
      return spec.spec_talent_nodes;
    }
  );

  // Sort talents by node_type.id
  const sortedTalents = filteredTalents.sort((a, b) => a.id - b.id);

  return sortedTalents;
}

function toBits(value: number, bitSize: number): number[] {
  const bits: number[] = [];
  const valString = (value >>> 0).toString(2);
  const chars = valString.split("");
  if (chars.length !== bitSize) {
    for (let i = 0; i < Math.abs(bitSize - chars.length); i++) {
      bits.push(0);
    }
  }
  chars.forEach((char) => {
    bits.push(parseInt(char, 2));
  });
  return bits;
}

function bitsToBytes(bits: number[]): number[] {
  const bytes = [];
  let i = 0;

  while (i < bits.length) {
    let byte = 0;
    for (let j = 0; j < 8; j++) {
      byte = (byte << 1) | (bits[i + j] || 0);
    }
    bytes.push(byte);
    i += 8;
  }

  return bytes;
}

export { exportTalentTree };
