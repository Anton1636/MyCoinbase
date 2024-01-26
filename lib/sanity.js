import sanityClient from '@sanity/client'

export const client = sanityClient({
	projectId: 'kir9f1ga',
	dataset: 'production',
	apiVersion: '2024-01-23', // use current UTC date - see "specifying API version"!
	token:
		'skC1GtpAiOln0Neb3iOtaBPNxDiO2T5dpZ6pREZwSOt6Z0kbp1WjWKK50qOtl9jwV2z6ZFxKWAw8QDHLgTFrkP7RdrGWzgKKAmkvMHF5Hq6m58oHWXWBAy8K1Q6iNLqhxrhHkxBI5KFcWKDSvdcClbLPznmNXYnAH0B2B8u03xd1OrXcJ4yS', //
	useCdn: false,
})
