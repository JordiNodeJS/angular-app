export interface Country {
  name: CountryName;
  capital: string[];
  population: number;
  flags: CountryFlags;
}

export interface CountryName {
  common: string;
  official: string;
}

export interface CountryFlags {
  png: string;
  svg: string;
  alt: string;
}
