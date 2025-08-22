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
  static asPlainText(html: string): string {
    let text = html.replace(/<[^>]+>/g, "");

    const entities: Record<string, string> = {
      "&nbsp;": " ",
      "&amp;": "&",
      "&quot;": '"',
      "&#39;": "'",
      "&lt;": "<",
      "&gt;": ">",
      "&ordf;": "ª",
      "&ordm;": "º",
      "&eacute;": "é",
      "&Eacute;": "É",
      "&aacute;": "á",
      "&Aacute;": "Á",
      "&iacute;": "í",
      "&Iacute;": "Í",
      "&oacute;": "ó",
      "&Oacute;": "Ó",
      "&uacute;": "ú",
      "&Uacute;": "Ú",
      "&ntilde;": "ñ",
      "&Ntilde;": "Ñ",
      "&cent;": "¢",
      "&euro;": "€",
      "&dollar;": "$",
      "&sup2;": "²",
    };

    for (const [entity, char] of Object.entries(entities)) {
      text = text.replaceAll(entity, char);
    }

    return text;
  }
}
