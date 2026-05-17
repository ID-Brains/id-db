declare module 'virtual:starlight/user-config' {
	const config: Record<string, unknown>;
	export default config;
}

declare module 'virtual:starlight/components/*' {
	const Component: (...args: unknown[]) => unknown;
	export default Component;
}
