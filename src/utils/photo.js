/**
 * 사진 관련 유틸리티 함수를 모아둔 모듈입니다.
 * API 응답과 샘플 데이터를 동일한 구조로 맞춰 재사용성을 높입니다.
 */

/**
 * 이미지 경로를 브라우저에서 접근 가능한 정규화된 URL로 변환합니다.
 * @param {string|undefined|null} path - 서버에서 내려온 원본 경로
 * @returns {string} - 정규화된 이미지 URL
 */
export const normalizeImageUrl = (path) => {
    if (!path || typeof path !== "string") {
        return "";
    }

    const trimmed = path.trim();
    if (!trimmed) {
        return "";
    }

    if (
        trimmed.startsWith("http://") ||
        trimmed.startsWith("https://") ||
        trimmed.startsWith("/")
    ) {
        return trimmed;
    }

    return `/${trimmed.replace(/^\/+/, "")}`;
};

/**
 * 단일 사진 게시글 객체를 화면에서 사용하기 편한 형태로 변환합니다.
 * @param {object} post - API 또는 샘플에서 가져온 원본 데이터
 * @param {number} [fallbackIndex=0] - ID가 없을 때 사용할 인덱스
 * @returns {{
 *   id: string|number,
 *   title: string,
 *   desc: string,
 *   content: string,
 *   author: string,
 *   date: string,
 *   views: number,
 *   images: Array<{ id: string|number, url: string, originalFilename?: string, sortIndex: number, persisted?: boolean }>,
 *   img: string,
 *   primaryImage: string,
 *   createdAt: number
 * }}
 */
export const normalizePhotoPost = (post = {}, fallbackIndex = 0) => {
    const safePost = post ?? {};
    const id = safePost.id ?? fallbackIndex;

    const rawImages = Array.isArray(safePost.images)
        ? safePost.images
        : Array.isArray(safePost.imageUrls)
          ? safePost.imageUrls
          : [];

    const normalizedImages = rawImages
        .map((image, index) => {
            if (!image) return null;
            const candidate =
                typeof image === "string"
                    ? image
                    : image.url || image.imageUrl || image.storedPath || "";
            const url = normalizeImageUrl(candidate);
            if (!url) return null;

            return {
                id: image.id ?? `${id}-${index}`,
                url,
                originalFilename:
                    image.originalFilename ||
                    (typeof image === "object" ? image.name : undefined) ||
                    "",
                sortIndex: image.sortIndex ?? index,
                persisted:
                    typeof image === "object" && "persisted" in image
                        ? Boolean(image.persisted)
                        : undefined,
            };
        })
        .filter(Boolean);

    const rawCreatedAt =
        safePost.createdAt ??
        safePost.created_at ??
        safePost.createdAtMs ??
        safePost.date ??
        "";
    let createdAt = 0;
    if (typeof rawCreatedAt === "number") {
        createdAt = rawCreatedAt;
    } else if (typeof rawCreatedAt === "string" && rawCreatedAt) {
        const parsed = Date.parse(rawCreatedAt);
        createdAt = Number.isNaN(parsed) ? 0 : parsed;
    }

    const dateText =
        typeof safePost.date === "string"
            ? safePost.date
            : typeof safePost.createdAt === "string"
              ? safePost.createdAt.slice(0, 10)
              : "";

    const content = safePost.content ?? safePost.desc ?? "";
    const primaryImage = normalizedImages[0]?.url ?? "";

    return {
        id,
        title: safePost.title ?? "",
        desc: content,
        content,
        author: safePost.author || "관리자",
        date: dateText,
        views: typeof safePost.views === "number" ? safePost.views : 0,
        images: normalizedImages,
        img: primaryImage,
        primaryImage,
        createdAt,
    };
};

/**
 * 샘플 사진 데이터 배열을 normalizePhotoPost 포맷으로 변환합니다.
 * @param {Array<object>} list - 샘플 사진 배열
 * @returns {ReturnType<typeof normalizePhotoPost>[]} - 정규화된 사진 데이터 목록
 */
export const buildSamplePhotoList = (list = []) =>
    (Array.isArray(list) ? list : []).map((item, idx) =>
        normalizePhotoPost(
            {
                ...item,
                id: item.id ?? idx,
                title: item.title ?? "",
                content: item.desc ?? "",
                desc: item.desc ?? "",
                author: item.author ?? "관리자",
                views: typeof item.views === "number" ? item.views : 0,
                date: item.date ?? "",
                images: item.img
                    ? [
                          {
                              id: item.id ? `sample-${item.id}` : `sample-${idx}`,
                              url: item.img,
                              originalFilename: item.img,
                              sortIndex: 0,
                              persisted: true,
                          },
                      ]
                    : [],
            },
            idx
        )
    );
