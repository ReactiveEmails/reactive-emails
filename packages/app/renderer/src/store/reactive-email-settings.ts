import { defineStore } from 'pinia';

interface ReactiveEmailSettingsStoreState {
	emailUsername: string | undefined;
	purpose: string;
	reactiveHashSecret: string;
	domain: string;
	customDomain: boolean;
	versionNumber: number;
}

export const useReactiveEmailSettingsStore = defineStore(
	'reactive-email-settings',
	{
		state: (): ReactiveEmailSettingsStoreState => ({
			emailUsername: undefined,
			purpose: '',
			domain: '',
			reactiveHashSecret: '',
			customDomain: false,
			versionNumber: 1,
		}),
	}
);
