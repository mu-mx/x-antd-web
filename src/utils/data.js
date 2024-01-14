export const get = (url) =>
    fetch(url)
        .then((response) => {
            // network failure, request prevented
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response);
            }

            return Promise.reject(new Error(response.statusText));
        })
        .then((response) => response.json())
        .then((result) => result)
        .catch((error) => {
            console.log("error - >:", error);
            return [];
        });

const mapToTree = (data) => {
    const res = [];
    const map = {};
    data.forEach((item) => {
        map[item.id] = item;
    });
    data.forEach((item) => {
        const parent = map[item.pId];
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            res.push(item);
        }
    });
    return res;
};

export const fetchData = async () => {
    try {
        const basePath = `https://raw.githubusercontent.com/mu-mx/site-database/main/data`;

        const categoryPath = `${basePath}/category.json`;
        const websitePath = `${basePath}/website.json`;

        const categoryData = await get(categoryPath);
        const websiteData = await get(websitePath);

        localStorage.setItem("cate", JSON.stringify(categoryData));
        localStorage.setItem("site", JSON.stringify(websiteData));
    } catch (err) {
        console.log("err - >:", err);
    }
};

const getFinalData = () => {
    if (!localStorage.getItem("cate")) {
        fetchData();
    }

    return {
        categoryData: JSON.parse(localStorage.getItem("cate") || "[]"),
        websiteData: JSON.parse(localStorage.getItem("site") || "[]"),
    };
};

export const getDataBase = async () => {
    const { categoryData, websiteData } = await getFinalData();

    const categoryMap = {};
    categoryData.forEach((item) => {
        item.children = [];
        categoryMap[item.id] = item;
    });

    websiteData.forEach((item) => {
        if (categoryMap[item.pId]) {
            categoryMap[item.pId].children.push(item);
        }
    });

    return mapToTree(categoryData);
};

export const getDataByName = async (title) => {
    const websiteData = JSON.parse(localStorage.getItem("site") || "[]");

    const backData = websiteData;

    if (!title) {
        return backData;
    }

    return backData.filter((item) => {
        return (
            item.pTitle.toLowerCase().includes(title.toLowerCase()) ||
            item.title.toLowerCase().includes(title.toLowerCase()) ||
            item.description.toLowerCase().includes(title.toLowerCase()) ||
            item.url.toLowerCase().includes(title.toLowerCase())
        );
    });
};
