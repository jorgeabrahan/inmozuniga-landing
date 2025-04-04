export class UtilsFormat {
  static capitalize(text: string): string {
    const singleSpacedText = UtilsFormat.asSingleSpaced(text.trim());
    return singleSpacedText
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
  static asSingleSpaced(sentence: string): string {
    return sentence.replace(/\s+/g, " ");
  }
  static asCurrency(
    amount: number,
    options: {
      locales: string | string[];
      currency: string;
    } = { locales: "en-US", currency: "USD" },
  ) {
    return new Intl.NumberFormat(options.locales, {
      style: "currency",
      currency: options.currency,
    }).format(amount);
  }
}
