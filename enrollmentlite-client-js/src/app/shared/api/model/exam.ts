/**
 * Enrollment API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 0.48.6
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */



export interface Exam {
    /**
     * Identifier of the exam (e.g. 'math')
     */
    id?: string;

    /**
     * Exam name translated in given language
     */
    name?: string;

    /**
     * If the exam needs to be marked as checked to pass
     */
    obligation?: string;

    /**
     * If the exam is actual, or the generalized (contains group of exams, e.g. 'nativelang')
     */
    generalization?: string;

    /**
     * Where the exam supposed to be passed
     */
    passingPlace?: string;

    /**
     * Exams popularity to be used for sorting exams
     */
    popularity?: number;

    /**
     * If the exam is actual but his parent exams is generalized (e.g. 'russian' to 'nativelang')
     */
    parentExam?: string;

    /**
     * If the exam needs to be omitted from the exam choose list
     */
    hidden?: boolean;

}
