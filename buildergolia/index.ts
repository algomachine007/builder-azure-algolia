import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { CloneService } from "./services/clone";
import { BUILDER_EVENT } from "./services/clone/enum";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
): Promise<void> {
  context.log("REQ OBJECT", req.body);

  //   context.log("HTTP trigger function processed a request.");
  //   const name = req.query.name || (req.body && req.body.name);
  //   const responseMessage = name
  //     ? "Hello, " +
  //       name +
  //       ". This HTTP triggered function executed successfully."
  //     : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

  //   context.res = {
  //     // status: 200, /* Defaults to 200 */
  //     body: responseMessage,
  //   };

  try {
    // bail out early
    if (req.body === undefined) {
      context.res = {
        status: 400,
        body: "Req.body is undefined, please check your connection",
      };
    }

    const algoliaService = new CloneService();
    switch (req.body?.operation) {
      case BUILDER_EVENT.DELETE: {
        const responseMessage = await algoliaService.deleteFaqCategoryInAlgolia(
          req.body?.previousValue,
        );
        context.res = {
          body: responseMessage,
        };
      }

      case BUILDER_EVENT.PUBLISH: {
        if (
          !req.body?.previousValue?.lastUpdateBy &&
          !req.body?.newValue?.lastUpdateBy
        ) {
          context.log("REQ OBJECT", req.body);
          await algoliaService.cloneFaqToAlgolia(req.body?.newValue);
          //   return res
          //     .status(HTTP_STATUS.OK.CODE)
          //     .send(HTTP_STATUS.CREATED.MESSAGE);
        }
        const responseMessage = await algoliaService.updateFaqCategoryInAlgolia(
          req.body?.newValue?.data,
        );
        context.res = {
          body: responseMessage,
        };

        // return res
        //   .status(HTTP_STATUS.CREATED.CODE)
        //   .send(HTTP_STATUS.CREATED.MESSAGE);
      }
    }
  } catch (error) {
    context.res = {
      status: 500,
      headers: {
        "content-type": "application/json",
      },
      body: { message: error.toString() },
    };
  }
};

export default httpTrigger;
