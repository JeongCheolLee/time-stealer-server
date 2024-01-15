import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
import { ObjectResponse } from '../dtos/object-response.dto';
import { ApiDocOptions } from '../interfaces/api-doc-options';
import { ListResponse } from '../dtos/list-response.dto';

/**
 * Decorator - Swagger Api 정의
 *
 * @Example
 * ```ts
 * @ApiDocs({
 *   summary:"주문리스트 조회",
 *   description:"고객이 구매한 상품 주문내역 리스트를 조회합니다."
 *   responseModel:Order,
 *   isArrayResponse:true
 * })
 * ```
 * @param options - Swagger 작성시 입력가능한 옵션객체
 *
 */
export const ApiDoc = (options: ApiDocOptions) => {
  const {
    responseModel,
    summary,
    description,
    isArrayResponse = false,
    deprecated = false,
  } = options;

  const decorators = [];
  const hasObjectResponseModel = responseModel && !isArrayResponse;
  const hasListResponseModel = responseModel && isArrayResponse;
  const shouldAddModelSchema = responseModel;

  /**
   * 문서 정의 Decorator 등록
   */
  const apiOperation = ApiOperation({
    summary,
    description,
    deprecated,
  });
  decorators.push(apiOperation);

  /**
   * 공통 응답형식 스키마 등록 (응답 Wrapper)
   */
  const extraModels = [ObjectResponse, ListResponse];
  if (shouldAddModelSchema) {
    extraModels.push(responseModel);
  }
  const apiExtraModels = ApiExtraModels(...extraModels);
  decorators.push(apiExtraModels);

  /**
   * 단일 객체 응답 스키마 등록
   */
  if (hasObjectResponseModel) {
    const objectResponse = ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ObjectResponse) },
          {
            required: ['row'],
            properties: {
              row: {
                $ref: getSchemaPath(responseModel),
              },
            },
          },
        ],
      },
    });
    decorators.push(objectResponse);
  }

  /**
   * 리스트 객체 응답 스키마 등록
   */
  if (hasListResponseModel) {
    const listResponse = ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ListResponse) },
          {
            required: ['rows'],
            properties: {
              rows: {
                type: 'array',
                items: { $ref: getSchemaPath(responseModel) },
              },
            },
          },
        ],
      },
    });
    decorators.push(listResponse);
  }

  return applyDecorators(...decorators);
};
