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

import { Campaign } from './campaign';
import { Lang } from './lang';
import { Region } from './region';


export interface DefaultsResponse {
    /**
     * Langs with the only default
     */
    langs?: Array<Lang>;

    /**
     * Regions with the only default, listed in the default lang
     */
    regions?: Array<Region>;

    /**
     * Campaigns corresponds to the default  lang and region
     */
    campaigns?: Array<Campaign>;

}


