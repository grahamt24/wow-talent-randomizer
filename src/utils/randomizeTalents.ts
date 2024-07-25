import seedrandom from "seedrandom";
import { RestrictionLine, TalentNode } from "../api/BlizzardAPI/types";

/**
 * Determines if a talent can be unlocked based on current selections and restrictions.
 *
 * @param talent - The talent node to check for unlock conditions.
 * @param selectedTalents - An array of currently selected talent nodes.
 * @param restrictionLines - An array of restriction lines that dictate talent unlock conditions.
 * @param pointsSpent - The number of points spent in the talent tree.
 * @returns A boolean indicating whether the talent can be unlocked (true) or not (false).
 */
function canBeUnlocked(
  talent: TalentNode,
  selectedTalents: TalentNode[],
  restrictionLines: RestrictionLine[],
  pointsSpent: number
): boolean {
  // If the talent is not locked by any other talents, it can be unlocked
  if (talent.lockedBy === undefined || talent.lockedBy.length === 0) {
    return true;
  }

  // Check if there are any restrictions based on the current points spent and talent row
  const isRestricted = restrictionLines.some(
    (line) =>
      line.is_for_class === talent.isClassTalent && // Check if the restriction applies to the talent's class
      pointsSpent < line.required_points && // Ensure enough points have been spent
      talent.row > line.restricted_row // Ensure the talent is in a higher row than the restriction
  );

  // If any restrictions apply, the talent cannot be unlocked
  if (isRestricted) {
    return false;
  }

  // Check if any selected talent is partially selected and in a higher row, blocking this talent
  const isPartiallySelectedBlocking = selectedTalents.some(
    (selectedTalent) =>
      selectedTalent.partiallySelected && selectedTalent.row < talent.row
  );

  // If a partially selected talent is blocking, this talent cannot be unlocked
  if (isPartiallySelectedBlocking) {
    return false;
  }

  // Finally, check if this talent is locked by any of the selected talents
  return talent.lockedBy.some((lockId) =>
    selectedTalents.some((t) => t.id === lockId)
  );
}

/**
 * Selects a talent from the available talents based on the specified weighting method.
 *
 * @param talents - An array of available talent nodes to choose from.
 * @param weighting - The method of weighting talent selection, either "flat" or "exponential".
 * @param rng - A function that generates a random number between 0 and 1.
 * @returns A randomly selected talent node based on the specified weighting method.
 */
function selectTalent(
  talents: TalentNode[],
  weighting: "flat" | "exponential",
  rng: () => number
): TalentNode {
  // If the weighting method is "flat", select a talent randomly
  if (weighting === "flat") {
    return talents[Math.floor(rng() * talents.length)];
  } else {
    // Calculate weights for each talent based on their index
    const weights = talents.map((_, index) => Math.pow(index + 1, 2));
    const totalWeight = weights.reduce((acc, weight) => acc + weight, 0); // Sum of all weights
    const random = rng() * totalWeight; // Generate a random number within the total weight
    let cumulativeWeight = 0;

    // Select a talent based on the cumulative weights
    for (let i = 0; i < talents.length; i++) {
      cumulativeWeight += weights[i]; // Update cumulative weight
      if (random < cumulativeWeight) {
        return talents[i]; // Return the selected talent
      }
    }
  }

  // Fallback in case no talent is selected (should not happen)
  return talents[0];
}

/**
 * Randomizes the selection of talents
 *
 * @param talents - An array of available talent nodes to choose from.
 * @param restrictionLines - An array of restriction lines that dictate talent unlock conditions.
 * @param weighting - The method of weighting talent selection, either "flat" or "exponential".
 * @param isClassTree - A boolean indicating if the talent tree is a class tree (true) or not (false).
 * @returns An array of talents with their selected ranks.
 */
function randomizeTalents(
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
      const isPartiallySelected =
        isSelected && talent.rank > 0 && talent.rank < talent.totalRanks;
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

export { randomizeTalents };
