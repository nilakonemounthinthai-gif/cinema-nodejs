import { BACKEND_URL, DEFAULT_IMG } from '../constants/config';

/**
 * Resolves a movie image URL to a displayable src:
 * - /images/... (file saved by multer) → prefixed with backend origin
 * - base64 data URI or external http(s) URL → returned as-is
 * - null / empty → DEFAULT_IMG placeholder
 */
export const getImageUrl = (hinhAnh) => {
    if (!hinhAnh) return DEFAULT_IMG;
    if (hinhAnh.startsWith('/images/')) return `${BACKEND_URL}${hinhAnh}`;
    return hinhAnh;
};
