async function getNodeImage(
  className: string,
  specName: string,
  spellId: string,
  isClassTalent: boolean
): Promise<string> {
  const image = await import(
    `../../../assets/${className}/talents/${
      isClassTalent ? "class" : `${specName}`
    }/${spellId}.jpg`
  );
  return image.default;
}

export { getNodeImage };
