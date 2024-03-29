/**
 * The DefaultController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

import Controller from './Controller'
import * as service from '../services/DefaultService'
import { OpenApiRequest } from 'express-openapi-validator/dist/framework/types'
import { Response } from 'express'
import bodyData from 'body-data'

export const apiFacercgGET = async (request: OpenApiRequest, response: Response) => {
    await Controller.handleRequest(request, response, service.apiFacercgGET)
}

export const apiImgholderGET = async (request: OpenApiRequest, response: Response) => {
    await Controller.handleRequest(request, response, service.apiImgholderGET)
}

export const apiIpGET = async (request: OpenApiRequest, response: Response) => {
    await Controller.handleRequest(request, response, service.apiIpGET)
}

export const apiPixelArtPOST = async (request: OpenApiRequest, response: Response) => {
    await Controller.handleRequest(request, response, service.apiPixelArtPOST)
}

export const apiKFCCrazyThursdayGET = async (request: OpenApiRequest, response: Response) => {
    response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' }) //设置response编码为utf-8
    await Controller.handleRequest(request, response, service.apiKFCCrazyThursdayGET)
}

export const apiQrcodeGET = async (request: OpenApiRequest, response: Response) => {
    await Controller.handleRequest(request, response, service.apiQrcodeGET)
}

export const apiTranslateGET = async (request: OpenApiRequest, response: Response) => {
    await Controller.handleRequest(request, response, service.apiTranslateGET)
}

export const apiScreenshotGET = async (request: OpenApiRequest, response: Response) => {
    function cache(cache: number | boolean | undefined): string | undefined {
        // Do not use http forced caching
        // catch is false or cache is zero
        if (cache === false || cache === 0) return undefined

        const sec = Math.abs(cache as number)
        const daySec = 86400
        const cacheKey = 'public, no-transform, s-maxage=$, max-age=$'

        if (!cache) return cacheKey.replace(/\$/g, daySec.toString())

        if (isNumber(sec)) return cacheKey.replace(/\$/g, sec.toString())

        return undefined
    }
    function isNumber(value: number) {
        return !isNaN(value)
    }
    const data = await bodyData(request)

    //@ts-ignore
    const cacheResult = cache(data.cache)
    if (cacheResult) response.setHeader('Cache-Control', cacheResult)
    await Controller.handleRequest(request, response, service.apiScreenshotGET)
}
