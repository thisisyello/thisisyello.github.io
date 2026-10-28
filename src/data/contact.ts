interface ContactInfo {
    email: string | null;
    github: {
        url: string;
        label: string;
    };
}

export const contact: ContactInfo = {
    email: "yello.3617@gmail.com",
    github: {
        url: "https://github.com/thisisyello",
        label: "github.com/thisisyello",
    },
};
