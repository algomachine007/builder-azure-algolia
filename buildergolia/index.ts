import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { CloneService } from "./services/clone";
import { BUILDER_EVENT } from "./services/clone/enum";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
): Promise<void> {
  try {
    const cloneFaqToAlgoliaService = new CloneService();

    if (!req.body) {
      context.res = {
        status: 400,
        body: "Req.body is undefined, please check your connection",
      };
    }

    switch (req.body?.operation) {
      case BUILDER_EVENT.DELETE: {
        const responseMessage =
          await cloneFaqToAlgoliaService.deleteFaqCategoryInAlgolia(
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
          const responseMessage =
            await cloneFaqToAlgoliaService.cloneFaqToAlgolia(
              req.body?.newValue,
            );
          context.log("CREATED", responseMessage);
          context.res = {
            body: responseMessage,
            status: "created",
          };
        } else {
          const responseMessage =
            await cloneFaqToAlgoliaService.updateFaqCategoryInAlgolia(
              req.body?.newValue?.data,
            );
          context.res = {
            body: responseMessage,
            status: "updated",
          };
        }
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
