import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { CloneService } from "./services/clone";
import { BUILDER_EVENT } from "./services/clone/enum";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
): Promise<void> {
  try {
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
          status: "deleted",
        };
      }

      case BUILDER_EVENT.PUBLISH: {
        if (
          !req.body?.previousValue?.lastUpdateBy &&
          !req.body?.newValue?.lastUpdateBy
        ) {
          const responseMessage = await algoliaService.cloneFaqToAlgolia(
            req.body?.newValue,
          );
          context.res = {
            body: responseMessage,
            status: "created",
          };
          //   return res
          //     .status(HTTP_STATUS.OK.CODE)
          //     .send(HTTP_STATUS.CREATED.MESSAGE);
        }
        const responseMessage = await algoliaService.updateFaqCategoryInAlgolia(
          req.body?.newValue?.data,
        );
        context.res = {
          body: responseMessage,
          status: "updated",
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
