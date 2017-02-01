export function generateUrl(name: string) {

    let url = name.replace(/\s+/g, '-').toLowerCase();
    return url;

  }