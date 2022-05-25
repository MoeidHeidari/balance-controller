import { HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { HttpResponseException } from '../exceptions';

//==================================================================================================
/**
 * processes http error that was throwed by service
 * @param error error (exception or string)
 * @param logger logger service
 */
export function processMicroserviceHttpError(error: any, logger: any) {
  let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  let message = undefined;
  let description = undefined;
  let data: any = {};
  let body: any = {};

  if (error instanceof Object && error.response) {
    if (error.response._body) body = error.response._body;
    if (error.response.data) body = error.response;
    if (error.response.statusCode) statusCode = error.response.statusCode;
    if (body.data) data = body.data;
    if (body.message) message = body.message;
    if (body.description) description = body.description;
    return { statusCode, message, description, data };
  }

  if (typeof error == 'string' || error instanceof Object) logger.error(error);

  if (error instanceof Error) logger.error(error.message, error);

  return { statusCode, message, description, data };
}

//==================================================================================================
/**
 * processes http error that was throwed by service
 * @param error error (exception or string)
 * @param logger logger service
 */
export function processHttpError(error: any, logger: any) {
  if (error instanceof HttpResponseException) throw error;

  if (typeof error == 'string') logger.error(error);

  if (error instanceof Error) logger.error(error.message, error);
}

//==================================================================================================
/**
 * validates dto and returns bad request if it is wrong
 * @param dto dto
 * @param httpResponseGenerator http response service
 */
export async function validateDTO(dto: any, httpResponseGenerator: any): Promise<any> {
  const errors = await validate(dto);

  if (errors.length) throw new HttpResponseException(httpResponseGenerator.generate(HttpStatus.BAD_REQUEST, errors));

  return dto;
}

//==================================================================================================
/**
 * validates output dto and throws an error if it is wrong
 * @param dto dto
 * @param logger logger service
 */
export async function validateOutputDTO(dto: any, logger: any): Promise<any> {
  const errors = await validate(dto);

  if (errors.length) {
    for (const i in errors) {
      logger.error(errors[i]);
    }
  }

  return dto;
}

//==================================================================================================
/**
 * Paginates the retrived list of array elements
 * @param array Array to perform pagination on
 * @param page_size number of the page
 * @param page_number limit number of the elements
 * @returns a list of elements
 */
export async function paginate(array: any, page_size: number, page_number: number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}
//===================================================================================================
/**
 * Calculates the distance between two given locations
 * @param lat1 latitude_one
 * @param lon1 longitude_one
 * @param lat2 latitude_two
 * @param lon2 longitude_two
 * @returns float number
 */
export async function distance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const p = 0.017453292519943295;
  const c = Math.cos;
  const a = 0.5 - c((lat2 - lat1) * p) / 2 + (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  return 12742 * Math.asin(Math.sqrt(a));
}
//===================================================================================================
/**
 * Asynchronous filtering on an array
 * @param arr Provides async filtering
 * @param predicate predicate parameter
 * @returns list of elements
 */
export async function asyncFilter(arr: any, predicate: any) {
  const results = await Promise.all(arr.map(predicate));
  return arr.filter((_v: any, index: any) => results[index]);
}
