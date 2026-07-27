export const getAvailableInventoryOptions = (options = [], selectedItems = []) => {
  const selectedInventoryIds = new Set(
    selectedItems
      .map((item) => Number(item.inventory_id))
      .filter((id) => !Number.isNaN(id))
  );

  return options.filter((option) => !selectedInventoryIds.has(Number(option.id)));
};

export const getNextOrderReferenceNumber = (
  records = [],
  orderPrefix,
  { fixedNumber = "3000", sequenceLength = 4 } = {}
) => {
  const year = String(new Date().getFullYear()).slice(-2);
  const referencePattern = new RegExp(
    `^(?:DO|WO)${fixedNumber}${year}(\\d+)$`
  );
  const highestSequence = records.reduce((highest, item) => {
    const reference = String(item.reference_number || "").trim();
    const match = reference.match(referencePattern);

    if (!match) {
      return highest;
    }

    const sequence = Number(match[1]);

    return Number.isNaN(sequence) ? highest : Math.max(highest, sequence);
  }, -1);
  const nextSequence = highestSequence + 1;

  return `${orderPrefix}${fixedNumber}${year}${String(nextSequence).padStart(
    sequenceLength,
    "0"
  )}`;
};
