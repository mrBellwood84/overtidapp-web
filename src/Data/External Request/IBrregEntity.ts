export interface IBrrregEntity {
    antallAnsatte: number;
    forretningsadresse: {
        adresse: string[]
        kommune: string;
        postnummer: string;
        poststed: string;
    }
    navn: string;
    naeringskode1: {
        beskrivelse: string;
        kode: string;
    }
    organisasjonsnummer: string;
}