function getNodeImage(
  className: string,
  specName: string,
  spellId: string,
  isClassTalent: boolean
) {
  return new URL(
    `../../../assets/${className}/talents/${
      isClassTalent ? "class" : specName
    }/${spellId}.jpg`,
    import.meta.url
  ).href;
}

export { getNodeImage };
