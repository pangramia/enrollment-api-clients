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



export interface Campaign {
    /**
     * Campaign identifier (e.g. '2015db4')
     */
    id: string;

    /**
     * Campaign basic name (e.g. 'day budget')
     */
    name: string;

    /**
     * Campaign year (e.g. '2015')
     */
    year?: number;

    /**
     * Number of exams that is issued for this campaign  (e.g. '3')
     */
    examsCount?: number;

    /**
     * URL to link for further details
     */
    detailsUrl?: string;

    /**
     * consider to set up this campaign as default  (optional param)
     */
    default?: boolean;

}


