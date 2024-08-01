import { convertTalentData } from "./convertTalentData";
import { TalentData } from "./types";

describe("convertTalentData", () => {
  const mockTalentData: TalentData[] = [
    {
      id: 1,
      ranks: [
        {
          default_points: 1,
          rank: 1,
          tooltip: {
            spell_tooltip: {
              description: "Talent 1",
              spell: { id: 101, name: "Spell 2", key: { href: "" } },
              cast_time: "1",
              cooldown: "30",
            },
            talent: {
              id: 101,
              name: "Talent 1",
              key: {
                href: "",
              },
            },
          },
        },
        {
          rank: 2,
          default_points: 2,
          tooltip: {
            spell_tooltip: {
              description: "Talent 1 Rank 2",
              spell: { id: 102, name: "Spell 2", key: { href: "" } },
              cast_time: "1",
              cooldown: "15",
            },
            talent: {
              id: 102,
              name: "Talent 1",
              key: {
                href: "",
              },
            },
          },
        },
      ],
      display_row: 1,
      display_col: 1,
      locked_by: [],
      unlocks: [],
      node_type: { id: 1, type: "ACTIVE" },
      isClassTalent: true,
      choiceNode: false,
    },
    {
      id: 2,
      ranks: [],
      display_row: 2,
      display_col: 2,
      locked_by: [],
      unlocks: [],
      node_type: { id: 2, type: "PASSIVE" },
      isClassTalent: true,
      choiceNode: false,
    },
    {
      id: 3,
      ranks: [
        {
          default_points: 0,
          rank: 1,
          tooltip: {
            spell_tooltip: {
              description: "Talent 3",
              spell: { id: 103, name: "Spell 3", key: { href: "" } },
              cast_time: "2",
              cooldown: "0",
            },
            talent: {
              id: 103,
              name: "Talent 3",
              key: {
                href: "",
              },
            },
          },
        },
      ],
      display_row: 1,
      display_col: 3,
      locked_by: [],
      unlocks: [],
      node_type: { id: 3, type: "ACTIVE" },
      isClassTalent: true,
      choiceNode: false,
    },
    {
      id: 4,
      ranks: [],
      display_row: 2,
      display_col: 3,
      locked_by: [],
      unlocks: [],
      node_type: { id: 4, type: "ACTIVE" },
      isClassTalent: true,
      choiceNode: false,
    },
  ];

  it("should convert talent data correctly", () => {
    const result = convertTalentData(mockTalentData, 1, true, false, {
      name: "Test",
      id: 2,
    });

    expect(result).toHaveLength(2); // Only 2 talents should be converted
    expect(result[0]).toEqual({
      id: 1,
      name: "Talent 1",
      description: "Talent 1 Rank 2",
      type: "active",
      totalRanks: 2,
      rank: 2,
      lockedBy: [],
      unlocks: [],
      row: 0,
      column: 1,
      spellId: 102,
      isClassTalent: true,
      choiceNode: false,
      choiceIndex: 0,
      isDefaultNode: true,
      isHeroNode: false,
      heroClassName: "Test",
    });
    expect(result[1]).toEqual({
      id: 3,
      name: "Talent 3",
      description: "Talent 3",
      type: "active",
      totalRanks: 1,
      rank: 0,
      lockedBy: [],
      unlocks: [],
      row: 0,
      column: 3,
      spellId: 103,
      isClassTalent: true,
      choiceNode: false,
      choiceIndex: 0,
      isDefaultNode: false,
      isHeroNode: false,
      heroClassName: "Test",
    });
  });

  it("should return an empty array if no valid talents are provided", () => {
    const result = convertTalentData([], 1, true, false, {
      name: "Test",
      id: 2,
    });
    expect(result).toEqual([]);
  });

  it("should handle choice nodes correctly", () => {
    // ensure Math.random() returns the 2nd item in the array
    jest.spyOn(global.Math, "random").mockReturnValue(0.75);
    const choiceTalentData: TalentData[] = [
      {
        id: 4,
        ranks: [
          {
            choice_of_tooltips: [
              {
                talent: { id: 201, name: "Choice Talent 1", key: { href: "" } },
                spell_tooltip: {
                  description: "Choice Talent 1 Description",
                  spell: { id: 201, name: "Choice Spell 1", key: { href: "" } },
                  cast_time: "instant",
                  cooldown: "6",
                },
              },
              {
                talent: { id: 202, name: "Choice Talent 2", key: { href: "" } },
                spell_tooltip: {
                  description: "Choice Talent 2 Description",
                  spell: { id: 202, name: "Choice Spell 2", key: { href: "" } },
                  cast_time: "1.5",
                  cooldown: "10",
                },
              },
            ],
          },
        ],
        display_row: 1,
        display_col: 1,
        locked_by: [],
        unlocks: [],
        node_type: { id: 1, type: "ACTIVE" },
        isClassTalent: true,
        choiceNode: true,
      },
    ];

    const result = convertTalentData(choiceTalentData, 1, false, false, {
      name: "Test",
      id: 2,
    });

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      id: 4,
      name: "Choice Talent 2",
      description: "Choice Talent 2 Description",
      type: "active",
      totalRanks: 1,
      rank: 0,
      lockedBy: [],
      unlocks: [],
      row: 0,
      column: 1,
      spellId: 202,
      isClassTalent: false,
      choiceNode: true,
      choiceIndex: 1,
      isDefaultNode: false,
      isHeroNode: false,
      heroClassName: "Test",
    });
    jest.spyOn(global.Math, "random").mockRestore();
  });
});
