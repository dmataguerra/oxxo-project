import {applyDecorators} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

export const ApiAuth = (() =>{
    return applyDecorators(
        ApiResponse({ status: 401, description: 'Missing or invalid JWT' }),
        ApiResponse({ status: 403, description: 'Missing role' }),
        ApiResponse({ status: 500, description: 'Server Error' })
    );
})