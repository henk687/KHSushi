import SanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = SanityClient({
  projectId: "ve5ez78b",
  dataset: 'production',
  apiVersion: "2022-07-16",
  useCdn: true,
  token: "skk4gWhpSh6gPSZQkASiA5ONotxyAsmK3oZK9MI74CtIpmbR6taZzqOmJxiudJJC5Y9FfjjgoXxbUlOtkd9FzVz76mXsyaG3QQKXAZk2vORoQnsjvP32H7KDfF99UTkM3WFEP2HkDqKgWbjPtbse6qQTz3hVVhotz1TMScqzBbvcsQrNi3PH"
})

const builder = ImageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)