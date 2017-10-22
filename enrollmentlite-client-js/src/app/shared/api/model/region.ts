/**
 * Enrollment API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 0.48.8
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */



export interface Region {
    /**
     * Identifier, domain zone for a country, or university by reverse url (e.g. 'by.bsu')
     */
    id: string;

    /**
     * Region name translated in given lang
     */
    name: string;

    /**
     * URL to link for further details of region
     */
    detailsUrl?: string;

    /**
     * consider to set up this region as default   (optional param)
     */
    default?: boolean;

}


