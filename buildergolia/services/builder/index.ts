import { errorHandler } from "../../../error/error-handler";
import { CloneService } from "../clone";
import { BUILDER_EVENT } from "../clone/enum";
import { HTTP_STATUS } from "../status";

const handler = async (req: any, res: any) => {
  try {
    const algoliaService = new CloneService();
    switch (req.body.operation) {
      case BUILDER_EVENT.DELETE: {
        await algoliaService.deleteFaqCategoryInAlgolia(
          req.body?.previousValue,
        );
        return res
          .status(HTTP_STATUS.OK.CODE)
          .send(HTTP_STATUS.NO_CONTENT.MESSAGE);
      }

      case BUILDER_EVENT.PUBLISH: {
        if (
          !req.body?.previousValue?.lastUpdateBy &&
          !req.body?.newValue?.lastUpdateBy
        ) {
          await algoliaService.cloneFaqToAlgolia(req.body?.newValue);
          return res
            .status(HTTP_STATUS.OK.CODE)
            .send(HTTP_STATUS.CREATED.MESSAGE);
        }
        await algoliaService.updateFaqCategoryInAlgolia(
          req.body?.newValue?.data,
        );
        return res
          .status(HTTP_STATUS.CREATED.CODE)
          .send(HTTP_STATUS.CREATED.MESSAGE);
      }
    }
  } catch (error) {
    errorHandler(error, res);
  }
};
export default handler;
