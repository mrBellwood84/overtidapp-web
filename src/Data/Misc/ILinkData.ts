import { SvgIconProps } from "@mui/material";
import React from "react";

/** Model for text and href for links and buttons. 
 * Used for passing data for navigation buttons and links. */
export interface ILinkData {
    /** i18next key for text */
    linkText: string;

    /** link icon */
    linkIcon?: React.ReactElement<SvgIconProps>;

    /** link for navigation */
    href: string;
}