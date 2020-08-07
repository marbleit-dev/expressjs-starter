/**
 * @file Defines a method which processes the provided error and sends it to the client.
 * @author Marble IT
 */

/**
 * Sends an error message to the client.
 * @param error Object of an error that occured in the system.
 * @param res Response object in which the error will be sent.
 */
export function processError(error: any, res: any) {
    res.send({
        message: error.message || "An error ocurred during your request.",
        success: false,
    })
}
