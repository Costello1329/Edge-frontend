import {LocaleType, Locale, ru_RU, en_GB} from "./locales";
import Cookie from "js-cookie";



class LocalizationService {
  private locale: LocaleType;

  constructor () {
    const locale: LocaleType | null = this.getLocale();

    if (locale === null) {
      let defaultLocale: LocaleType = LocaleType.en_GB;

      if (
        window.navigator.languages.indexOf("ru-RU") !== -1 ||
        window.navigator.languages.indexOf("ru-ru") !== -1 ||
        window.navigator.languages.indexOf("ru") !== -1
      )
        defaultLocale = LocaleType.ru_RU;
      
      this.locale = defaultLocale;
      Cookie.set("locale", defaultLocale);
    }

    else
      this.locale = locale;
  }

  public localize<K extends keyof Locale> (key: K): any {
    return (
      (): Locale => 
      {
        switch (this.locale) {
          case LocaleType.ru_RU:
            return ru_RU;
          case LocaleType.en_GB:
            return en_GB;
        }
      }
    )()[key];
  }

  public getLocale (): LocaleType | null {
    const value: string | undefined = Cookie.get("locale");

    switch (value) {
      case LocaleType.ru_RU:
        return LocaleType.ru_RU;
      case LocaleType.en_GB:
        return LocaleType.en_GB;
      default:
        return null;
    }
  }

  public setLocale (locale: LocaleType): void {
    if (locale === this.getLocale())
      return;

    Cookie.set("locale", locale);
    location.reload();
  }
}


export const localization: LocalizationService = new LocalizationService();
