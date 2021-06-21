/**
 * Post Interface, this keeps a restriction on what a Post is built out of. The post requires and ID type string.
 * header type string, message type string, body type string, references type string and poster type string.
 * These conditions need to be met.
 */
export interface Post {
  id: string;
  header: string;
  message: string;
  body: string;
  references: string;
  poster: string;
  moduleName?: string;
  abstract: string;
}

export interface References {
	entry: string;
	id: string;
	oa_query: string;
	scholar_url: string;
}