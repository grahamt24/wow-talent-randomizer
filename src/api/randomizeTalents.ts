import { TalentNode } from "../components/TalentTrees/TalentNode";
import { RestrictionLine } from "./convertResponseData";
import seedrandom from "seedrandom";

export function randomizeTalents(
  talents: TalentNode[],
  restrictionLines: RestrictionLine[],
  weighting: "flat" | "exponential",
  isClassTree: boolean
) {
  const rng = seedrandom();
  const totalPoints = isClassTree ? 31 : 30; // Adjust total points based on tree type
  let pointsSpent = isClassTree ? 1 : 0; // Start with 1 point spent if it's a class tree
  const defaultTalent = talents.find((talent) => talent.rank > 0);
  const selectedTalents: TalentNode[] = isClassTree ? [defaultTalent!] : [];

  while (pointsSpent < totalPoints) {
    const availableTalents = talents.filter((talent) => {
      const isSelected = selectedTalents.some((t) => t.id === talent.id);
      const isPartiallySelected = isSelected && talent.rank > 0 && talent.rank < talent.totalRanks;
      return (
        (!isSelected || isPartiallySelected) &&
        canBeUnlocked(talent, selectedTalents, restrictionLines, pointsSpent)
      );
    });
    if (availableTalents.length === 0) break;

    const selectedTalent = selectTalent(availableTalents, weighting, rng);
    const currentRank =
      selectedTalents.find((t) => t.id === selectedTalent.id)?.rank || 0;

    if (currentRank < selectedTalent.totalRanks) {
      selectedTalent.rank = currentRank + 1;
      if (!selectedTalents.includes(selectedTalent)) {
        selectedTalents.push(selectedTalent);
      }
      pointsSpent += 1;
    }

    selectedTalents.forEach((talent) => {
      if (talent.rank > 0 && talent.rank < talent.totalRanks) {
        talent.partiallySelected = true;
      } else {
        talent.partiallySelected = false;
      }
    });
  }

  const allTalentsWithSelection = talents.map((talent) => ({
    ...talent,
    rank: selectedTalents.includes(talent) ? talent.rank : 0,
  }));

  return allTalentsWithSelection;
}

function canBeUnlocked(
  talent: TalentNode,
  selectedTalents: TalentNode[],
  restrictionLines: RestrictionLine[],
  pointsSpent: number
): boolean {
  if (talent.lockedBy === undefined || talent.lockedBy.length === 0) {
    return true;
  }

  const isRestricted = restrictionLines.some(
    (line) =>
      line.is_for_class === talent.isClassTalent &&
      pointsSpent < line.required_points &&
      talent.row > line.restricted_row
  );

  if (isRestricted) {
    return false;
  }

  // Check if any selected talent is partially selected and in a higher row
  const isPartiallySelectedBlocking = selectedTalents.some(
    (selectedTalent) =>
      selectedTalent.partiallySelected && selectedTalent.row < talent.row
  );

  if (isPartiallySelectedBlocking) {
    return false;
  }

  return talent.lockedBy.some((lockId) =>
    selectedTalents.some((t) => t.id === lockId)
  );
}

function selectTalent(
  talents: TalentNode[],
  weighting: "flat" | "exponential",
  rng: () => number
): TalentNode {
  if (weighting === "flat") {
    return talents[Math.floor(rng() * talents.length)];
  } else {
    const weights = talents.map((_, index) => Math.pow(index + 1, 2));
    const totalWeight = weights.reduce((acc, weight) => acc + weight, 0);
    const random = rng() * totalWeight;
    let cumulativeWeight = 0;
    for (let i = 0; i < talents.length; i++) {
      cumulativeWeight += weights[i];
      if (random < cumulativeWeight) {
        return talents[i];
      }
    }
  }
  return talents[0];
}
