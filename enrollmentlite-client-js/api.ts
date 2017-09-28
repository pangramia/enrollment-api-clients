/* tslint:disable */
import * as url from "url";

interface Dictionary<T> { [index: string]: T; }
export interface FetchAPI { (url: string, init?: any): Promise<any>; }

const BasePath = "https://api.pangramia.com/enroll/v1";
const FetchImpl = fetch;

export interface FetchArgs {
    url: string;
    options: any;
}

export class BaseAPI {
    basePath: string;
    fetch: FetchAPI;

    constructor(fetch: FetchAPI = FetchImpl, basePath: string = BasePath) {
        this.basePath = basePath;
        this.fetch = fetch;
    }
}

export interface Campaign {
    /**
     * Campaign identifier (e.g. '2015db4')
     */
    "id"?: string;
    /**
     * Campaign basic name (e.g. 'day budget')
     */
    "name"?: string;
    /**
     * Campaign year (e.g. '2015')
     */
    "year"?: number;
    /**
     * Number of exams that is issued for this campaign  (e.g. '3')
     */
    "examsCount"?: number;
    /**
     * URL to link for further details
     */
    "detailsUrl"?: string;
    /**
     * consider to set up this campaign as default  (optional param)
     */
    "default"?: boolean;
}


export interface CampaignsResponse {
    "items"?: Array<Campaign>;
}


export interface DefaultsResponse {
    /**
     * Langs with the only default
     */
    "langs"?: Array<Lang>;
    /**
     * Regions with the only default, listed in the default lang
     */
    "regions"?: Array<Region>;
    /**
     * Campaigns corresponds to the default  lang and region
     */
    "campaigns"?: Array<Campaign>;
}


export interface ErrorResponse {
    "message": string;
}


export interface Exam {
    /**
     * Identifier of the exam (e.g. 'math')
     */
    "id"?: string;
    /**
     * Exam name translated in given language
     */
    "name"?: string;
    /**
     * If the exam needs to be marked as checked to pass
     */
    "obligation"?: string;
    /**
     * If the exam is actual, or the generalized (contains group of exams, e.g. 'nativelang')
     */
    "generalization"?: string;
    /**
     * Where the exam supposed to be passed
     */
    "passingPlace"?: string;
    /**
     * Exams popularity to be used for sorting exams
     */
    "popularity"?: number;
    /**
     * If the exam is actual but his parent exams is generalized (e.g. 'russian' to 'nativelang')
     */
    "parentExam"?: string;
    /**
     * If the exam needs to be omitted from the exam choose list
     */
    "hidden"?: boolean;
}


export interface ExamsResponse {
    "items"?: Array<Exam>;
    /**
     * Compatible exams grouped in  suites
     */
    "suites"?: Array<Suite>;
}


export interface Lang {
    /**
     * Lang identifier
     */
    "id"?: string;
    /**
     * Lang name in native
     */
    "name"?: string;
    /**
     * consider to set up this lang as default (optional param)
     */
    "default"?: boolean;
}


export interface LangsResponse {
    "items"?: Array<Lang>;
}


export interface Region {
    /**
     * Identifier, domain zone for a country, or university by reverse url (e.g. 'by.bsu')
     */
    "id"?: string;
    /**
     * Region name translated in given lang
     */
    "name"?: string;
    /**
     * URL to link for further details of region
     */
    "detailsUrl"?: string;
    /**
     * consider to set up this region as default   (optional param)
     */
    "default"?: boolean;
}


export interface RegionsResponse {
    "items"?: Array<Region>;
}


export interface RequestLine {
    "id"?: string;
    "name"?: string;
    "items"?: Array<RequestLineItem>;
}


export interface RequestLineItem {
    /**
     * Basically we provide either number, or empty values here
     */
    "value"?: string;
    /**
     * If the given request cell with the threshold value (e.g. 380) is passed well for enrollment (1 value), semipassed (0), or out of passing (-1). This may be used to colorize threshold tables, so each user may see if the given cell (with certain threshold value)  still pass enrollment minimal requirements.
     */
    "enrollLevel"?: number;
}


export interface RequestLines {
    "rows"?: Array<RequestLine>;
    "columns"?: Array<RequestLinesColumns>;
}


export interface RequestLinesColumns {
    "id"?: string;
    "name"?: string;
}


export interface Suite {
    /**
     * Identifier of the suite
     */
    "id"?: string;
    /**
     * Suite name
     */
    "name"?: string;
    /**
     * Exams for this suite
     */
    "exams"?: Array<string>;
}


export interface Threshold {
    /**
     * Identifier of the speciality
     */
    "id"?: string;
    /**
     * Speciality name
     */
    "name"?: string;
    "universityName"?: string;
    "universityShortName"?: string;
    "departmentName"?: string;
    "departmentShortName"?: string;
    /**
     * URL to link for further details
     */
    "detailsUrl"?: string;
    /**
     * Actual threshold level that needed to be enrolled to the given speciality
     */
    "threshold"?: number;
    /**
     * 'Chances to be enrolled, that may be depicted as a certain color, this depends on user total grades passed as the request'
     */
    "chance"?: number;
}


export interface ThresholdFullResponse {
    "items"?: RequestLines;
}


export interface ThresholdsResponse {
    /**
     * Current page of the search response
     */
    "page"?: number;
    /**
     * Total pages in the search response
     */
    "pageCount"?: number;
    /**
     * If the current response is centered to the given user grade
     */
    "isCentered"?: boolean;
    "items"?: Array<Threshold>;
}




/**
 * DefaultApi - fetch parameter creator
 */
export const DefaultApiFetchParamCreactor = {
    /** 
     * Returns available campaigns for a specific region
     * @param region Region (e.g. &#39;by.bsu&#39;)
     * @param lang Language to use in translated content
     */
    campaigns(params: {  region: string; lang?: string; }): FetchArgs {
        // verify required parameter "region" is set
        if (params["region"] == null) {
            throw new Error("Missing required parameter region when calling campaigns");
        }
        const baseUrl = `/search/{region}`
            .replace(`{${"region"}}`, `${ params.region }`);
        let urlObj = url.parse(baseUrl, true);
        urlObj.query = Object.assign({}, urlObj.query, { 
            "lang": params.lang,
        });
        let fetchOptions: RequestInit = { method: "GET" };

        let contentTypeHeader: Dictionary<string> = {};
        fetchOptions.headers = contentTypeHeader;
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /** 
     * Returns  langs with default lang, regions with default region, and campaigns for default region. Everything is listed in default lang. This REST method is to speed-up js client communication.
     */
    defaults(): FetchArgs {
        const baseUrl = `/`;
        let urlObj = url.parse(baseUrl, true);
        let fetchOptions: RequestInit = { method: "GET" };

        let contentTypeHeader: Dictionary<string> = {};
        fetchOptions.headers = contentTypeHeader;
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /** 
     * Returns exams for the campaign
     * @param region Region (e.g. &#39;by.bsu&#39;)
     * @param campaign Campaign (e.g. &#39;2015db4&#39; for day budget bachelor in 2015)
     * @param lang Language to use in translated content
     */
    exams(params: {  region: string; campaign: string; lang?: string; }): FetchArgs {
        // verify required parameter "region" is set
        if (params["region"] == null) {
            throw new Error("Missing required parameter region when calling exams");
        }
        // verify required parameter "campaign" is set
        if (params["campaign"] == null) {
            throw new Error("Missing required parameter campaign when calling exams");
        }
        const baseUrl = `/search/{region}/{campaign}/exams`
            .replace(`{${"region"}}`, `${ params.region }`)
            .replace(`{${"campaign"}}`, `${ params.campaign }`);
        let urlObj = url.parse(baseUrl, true);
        urlObj.query = Object.assign({}, urlObj.query, { 
            "lang": params.lang,
        });
        let fetchOptions: RequestInit = { method: "GET" };

        let contentTypeHeader: Dictionary<string> = {};
        fetchOptions.headers = contentTypeHeader;
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /** 
     * Returns language list in which content is available
     */
    langs(): FetchArgs {
        const baseUrl = `/langs`;
        let urlObj = url.parse(baseUrl, true);
        let fetchOptions: RequestInit = { method: "GET" };

        let contentTypeHeader: Dictionary<string> = {};
        fetchOptions.headers = contentTypeHeader;
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /** 
     * Returns available regions (e.g. countries, universities)
     * @param lang Language to use in translated content
     */
    regions(params: {  lang?: string; }): FetchArgs {
        const baseUrl = `/regions`;
        let urlObj = url.parse(baseUrl, true);
        urlObj.query = Object.assign({}, urlObj.query, { 
            "lang": params.lang,
        });
        let fetchOptions: RequestInit = { method: "GET" };

        let contentTypeHeader: Dictionary<string> = {};
        fetchOptions.headers = contentTypeHeader;
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /** 
     * Provide details on the given thresholds
     * @param region Region (e.g. &#39;by.bsu&#39;)
     * @param campaign Campaign (e.g. &#39;2015db4&#39; for day budget bachelor in 2015)
     * @param thresholdIds Threshold / Speciality id (e.g. &#39;web&#39;), either one item or semi colon (;) separated list
     * @param suite Exam suite  (e.g.&#39;mathematics&#39;)
     * @param lang Language to use in translated content
     */
    threshold(params: {  region: string; campaign: string; thresholdIds: string; suite?: string; lang?: string; }): FetchArgs {
        // verify required parameter "region" is set
        if (params["region"] == null) {
            throw new Error("Missing required parameter region when calling threshold");
        }
        // verify required parameter "campaign" is set
        if (params["campaign"] == null) {
            throw new Error("Missing required parameter campaign when calling threshold");
        }
        // verify required parameter "thresholdIds" is set
        if (params["thresholdIds"] == null) {
            throw new Error("Missing required parameter thresholdIds when calling threshold");
        }
        const baseUrl = `/search/{region}/{campaign}/thresholds/{thresholdIds}`
            .replace(`{${"region"}}`, `${ params.region }`)
            .replace(`{${"campaign"}}`, `${ params.campaign }`)
            .replace(`{${"thresholdIds"}}`, `${ params.thresholdIds }`);
        let urlObj = url.parse(baseUrl, true);
        urlObj.query = Object.assign({}, urlObj.query, { 
            "suite": params.suite,
            "lang": params.lang,
        });
        let fetchOptions: RequestInit = { method: "GET" };

        let contentTypeHeader: Dictionary<string> = {};
        fetchOptions.headers = contentTypeHeader;
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /** 
     * Returns list of thresholds for the campaign. Use either page option or position &#x3D; centered with gradeTotal.
     * @param region Region (e.g. &#39;by.bsu&#39;)
     * @param campaign Campaign (e.g. &#39;2015db4&#39; for day budget bachelor in 2015)
     * @param suite Exam suite  (e.g.&#39;mathematics&#39;)
     * @param gradeTotal Sum of exam mark&#39;s grades
     * @param page Search results page
     * @param centered Position the result page to total grade
     * @param lang Language to use in translated content
     */
    thresholds(params: {  region: string; campaign: string; suite: string; gradeTotal: number; page?: number; centered?: string; lang?: string; }): FetchArgs {
        // verify required parameter "region" is set
        if (params["region"] == null) {
            throw new Error("Missing required parameter region when calling thresholds");
        }
        // verify required parameter "campaign" is set
        if (params["campaign"] == null) {
            throw new Error("Missing required parameter campaign when calling thresholds");
        }
        // verify required parameter "suite" is set
        if (params["suite"] == null) {
            throw new Error("Missing required parameter suite when calling thresholds");
        }
        // verify required parameter "gradeTotal" is set
        if (params["gradeTotal"] == null) {
            throw new Error("Missing required parameter gradeTotal when calling thresholds");
        }
        const baseUrl = `/search/{region}/{campaign}/thresholds`
            .replace(`{${"region"}}`, `${ params.region }`)
            .replace(`{${"campaign"}}`, `${ params.campaign }`);
        let urlObj = url.parse(baseUrl, true);
        urlObj.query = Object.assign({}, urlObj.query, { 
            "suite": params.suite,
            "gradeTotal": params.gradeTotal,
            "page": params.page,
            "centered": params.centered,
            "lang": params.lang,
        });
        let fetchOptions: RequestInit = { method: "GET" };

        let contentTypeHeader: Dictionary<string> = {};
        fetchOptions.headers = contentTypeHeader;
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
}

/**
 * DefaultApi - functional programming interface
 */
export const DefaultApiFp = {
    /** 
     * Returns available campaigns for a specific region
     * @param region Region (e.g. &#39;by.bsu&#39;)
     * @param lang Language to use in translated content
     */
    campaigns(params: { region: string; lang?: string;  }): (fetch?: FetchAPI, basePath?: string) => Promise<CampaignsResponse> {
        const fetchArgs = DefaultApiFetchParamCreactor.campaigns(params);
        return (fetch: FetchAPI = FetchImpl, basePath: string = BasePath) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw response;
                }
            });
        };
    },
    /** 
     * Returns  langs with default lang, regions with default region, and campaigns for default region. Everything is listed in default lang. This REST method is to speed-up js client communication.
     */
    defaults(): (fetch?: FetchAPI, basePath?: string) => Promise<DefaultsResponse> {
        const fetchArgs = DefaultApiFetchParamCreactor.defaults();
        return (fetch: FetchAPI = FetchImpl, basePath: string = BasePath) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw response;
                }
            });
        };
    },
    /** 
     * Returns exams for the campaign
     * @param region Region (e.g. &#39;by.bsu&#39;)
     * @param campaign Campaign (e.g. &#39;2015db4&#39; for day budget bachelor in 2015)
     * @param lang Language to use in translated content
     */
    exams(params: { region: string; campaign: string; lang?: string;  }): (fetch?: FetchAPI, basePath?: string) => Promise<ExamsResponse> {
        const fetchArgs = DefaultApiFetchParamCreactor.exams(params);
        return (fetch: FetchAPI = FetchImpl, basePath: string = BasePath) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw response;
                }
            });
        };
    },
    /** 
     * Returns language list in which content is available
     */
    langs(): (fetch?: FetchAPI, basePath?: string) => Promise<LangsResponse> {
        const fetchArgs = DefaultApiFetchParamCreactor.langs();
        return (fetch: FetchAPI = FetchImpl, basePath: string = BasePath) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw response;
                }
            });
        };
    },
    /** 
     * Returns available regions (e.g. countries, universities)
     * @param lang Language to use in translated content
     */
    regions(params: { lang?: string;  }): (fetch?: FetchAPI, basePath?: string) => Promise<RegionsResponse> {
        const fetchArgs = DefaultApiFetchParamCreactor.regions(params);
        return (fetch: FetchAPI = FetchImpl, basePath: string = BasePath) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw response;
                }
            });
        };
    },
    /** 
     * Provide details on the given thresholds
     * @param region Region (e.g. &#39;by.bsu&#39;)
     * @param campaign Campaign (e.g. &#39;2015db4&#39; for day budget bachelor in 2015)
     * @param thresholdIds Threshold / Speciality id (e.g. &#39;web&#39;), either one item or semi colon (;) separated list
     * @param suite Exam suite  (e.g.&#39;mathematics&#39;)
     * @param lang Language to use in translated content
     */
    threshold(params: { region: string; campaign: string; thresholdIds: string; suite?: string; lang?: string;  }): (fetch?: FetchAPI, basePath?: string) => Promise<ThresholdFullResponse> {
        const fetchArgs = DefaultApiFetchParamCreactor.threshold(params);
        return (fetch: FetchAPI = FetchImpl, basePath: string = BasePath) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw response;
                }
            });
        };
    },
    /** 
     * Returns list of thresholds for the campaign. Use either page option or position &#x3D; centered with gradeTotal.
     * @param region Region (e.g. &#39;by.bsu&#39;)
     * @param campaign Campaign (e.g. &#39;2015db4&#39; for day budget bachelor in 2015)
     * @param suite Exam suite  (e.g.&#39;mathematics&#39;)
     * @param gradeTotal Sum of exam mark&#39;s grades
     * @param page Search results page
     * @param centered Position the result page to total grade
     * @param lang Language to use in translated content
     */
    thresholds(params: { region: string; campaign: string; suite: string; gradeTotal: number; page?: number; centered?: string; lang?: string;  }): (fetch?: FetchAPI, basePath?: string) => Promise<ThresholdsResponse> {
        const fetchArgs = DefaultApiFetchParamCreactor.thresholds(params);
        return (fetch: FetchAPI = FetchImpl, basePath: string = BasePath) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw response;
                }
            });
        };
    },
};

/**
 * DefaultApi - object-oriented interface
 */
export class DefaultApi extends BaseAPI {
    /** 
     * Returns available campaigns for a specific region
     * @param region Region (e.g. &#39;by.bsu&#39;)
     * @param lang Language to use in translated content
     */
    campaigns(params: {  region: string; lang?: string; }) {
        return DefaultApiFp.campaigns(params)(this.fetch, this.basePath);
    }
    /** 
     * Returns  langs with default lang, regions with default region, and campaigns for default region. Everything is listed in default lang. This REST method is to speed-up js client communication.
     */
    defaults() {
        return DefaultApiFp.defaults()(this.fetch, this.basePath);
    }
    /** 
     * Returns exams for the campaign
     * @param region Region (e.g. &#39;by.bsu&#39;)
     * @param campaign Campaign (e.g. &#39;2015db4&#39; for day budget bachelor in 2015)
     * @param lang Language to use in translated content
     */
    exams(params: {  region: string; campaign: string; lang?: string; }) {
        return DefaultApiFp.exams(params)(this.fetch, this.basePath);
    }
    /** 
     * Returns language list in which content is available
     */
    langs() {
        return DefaultApiFp.langs()(this.fetch, this.basePath);
    }
    /** 
     * Returns available regions (e.g. countries, universities)
     * @param lang Language to use in translated content
     */
    regions(params: {  lang?: string; }) {
        return DefaultApiFp.regions(params)(this.fetch, this.basePath);
    }
    /** 
     * Provide details on the given thresholds
     * @param region Region (e.g. &#39;by.bsu&#39;)
     * @param campaign Campaign (e.g. &#39;2015db4&#39; for day budget bachelor in 2015)
     * @param thresholdIds Threshold / Speciality id (e.g. &#39;web&#39;), either one item or semi colon (;) separated list
     * @param suite Exam suite  (e.g.&#39;mathematics&#39;)
     * @param lang Language to use in translated content
     */
    threshold(params: {  region: string; campaign: string; thresholdIds: string; suite?: string; lang?: string; }) {
        return DefaultApiFp.threshold(params)(this.fetch, this.basePath);
    }
    /** 
     * Returns list of thresholds for the campaign. Use either page option or position &#x3D; centered with gradeTotal.
     * @param region Region (e.g. &#39;by.bsu&#39;)
     * @param campaign Campaign (e.g. &#39;2015db4&#39; for day budget bachelor in 2015)
     * @param suite Exam suite  (e.g.&#39;mathematics&#39;)
     * @param gradeTotal Sum of exam mark&#39;s grades
     * @param page Search results page
     * @param centered Position the result page to total grade
     * @param lang Language to use in translated content
     */
    thresholds(params: {  region: string; campaign: string; suite: string; gradeTotal: number; page?: number; centered?: string; lang?: string; }) {
        return DefaultApiFp.thresholds(params)(this.fetch, this.basePath);
    }
};

/**
 * DefaultApi - factory interface
 */
export const DefaultApiFactory = function (fetch: FetchAPI = FetchImpl, basePath: string = BasePath) {
    return {
        /** 
         * Returns available campaigns for a specific region
         * @param region Region (e.g. &#39;by.bsu&#39;)
         * @param lang Language to use in translated content
         */
        campaigns(params: {  region: string; lang?: string; }) {
            return DefaultApiFp.campaigns(params)(fetch, basePath);
        },
        /** 
         * Returns  langs with default lang, regions with default region, and campaigns for default region. Everything is listed in default lang. This REST method is to speed-up js client communication.
         */
        defaults() {
            return DefaultApiFp.defaults()(fetch, basePath);
        },
        /** 
         * Returns exams for the campaign
         * @param region Region (e.g. &#39;by.bsu&#39;)
         * @param campaign Campaign (e.g. &#39;2015db4&#39; for day budget bachelor in 2015)
         * @param lang Language to use in translated content
         */
        exams(params: {  region: string; campaign: string; lang?: string; }) {
            return DefaultApiFp.exams(params)(fetch, basePath);
        },
        /** 
         * Returns language list in which content is available
         */
        langs() {
            return DefaultApiFp.langs()(fetch, basePath);
        },
        /** 
         * Returns available regions (e.g. countries, universities)
         * @param lang Language to use in translated content
         */
        regions(params: {  lang?: string; }) {
            return DefaultApiFp.regions(params)(fetch, basePath);
        },
        /** 
         * Provide details on the given thresholds
         * @param region Region (e.g. &#39;by.bsu&#39;)
         * @param campaign Campaign (e.g. &#39;2015db4&#39; for day budget bachelor in 2015)
         * @param thresholdIds Threshold / Speciality id (e.g. &#39;web&#39;), either one item or semi colon (;) separated list
         * @param suite Exam suite  (e.g.&#39;mathematics&#39;)
         * @param lang Language to use in translated content
         */
        threshold(params: {  region: string; campaign: string; thresholdIds: string; suite?: string; lang?: string; }) {
            return DefaultApiFp.threshold(params)(fetch, basePath);
        },
        /** 
         * Returns list of thresholds for the campaign. Use either page option or position &#x3D; centered with gradeTotal.
         * @param region Region (e.g. &#39;by.bsu&#39;)
         * @param campaign Campaign (e.g. &#39;2015db4&#39; for day budget bachelor in 2015)
         * @param suite Exam suite  (e.g.&#39;mathematics&#39;)
         * @param gradeTotal Sum of exam mark&#39;s grades
         * @param page Search results page
         * @param centered Position the result page to total grade
         * @param lang Language to use in translated content
         */
        thresholds(params: {  region: string; campaign: string; suite: string; gradeTotal: number; page?: number; centered?: string; lang?: string; }) {
            return DefaultApiFp.thresholds(params)(fetch, basePath);
        },
    }
};

