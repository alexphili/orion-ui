import { h, render, unref } from 'vue';
import { PopableService } from './PopableService';
import { _popables } from 'packages/Shared/SharedPopableSetupService';
import { OrionNotif } from 'packages/Notif';
import orionAppService from 'utils/Orion';
import useDocument from './DocumentService';

class NotifService extends PopableService<OrionNotif> {
	constructor (options: Partial<Orion.Notif.Options>) {
		super({
			duration: 5,
			...options,
		});
	}

	createVNode () {
		const vnode = h(OrionNotif, { options: this.options });
		vnode.appContext = orionAppService.appContext;

		const container = useDocument()?.createElement('div');
		if (container) {
			container.id = 'orion-notif-wrapper';
			useDocument()?.body.appendChild(container);
			render(vnode, container);
		}

		const instance = _popables[this.options.uid];
		return instance as OrionNotif;
	}

	static sanitizeOptions (payload: Partial<Orion.Notif.Options> | string, message?: string): Partial<Orion.Notif.Options> {
		if (typeof payload === 'string') {
			return {
				title: payload,
				message,
			};
		} else {
			return {
				...payload,
				message: message ?? unref(payload.message),
			};
		}
	}
}

const useNotif = {
	info: (options: Partial<Orion.Notif.Options> | string, message?: string) => new NotifService({
		icon: 'info_circle_outline',
		...NotifService.sanitizeOptions(options, message),
		color: 'info',
	}).createVNode(),
	success: (options: Partial<Orion.Notif.Options> | string, message?: string) => new NotifService({
		icon: 'circle_check_outline',
		...NotifService.sanitizeOptions(options, message),
		color: 'success',
	}).createVNode(),
	warning: (options: Partial<Orion.Notif.Options> | string, message?: string) => new NotifService({
		icon: 'warning_outline',
		...NotifService.sanitizeOptions(options, message),
		color: 'warning',
	}).createVNode(),
	danger: (options: Partial<Orion.Notif.Options> | string, message?: string) => new NotifService({
		icon: 'error_outline',
		...NotifService.sanitizeOptions(options, message),
		color: 'danger',
	}).createVNode(),
};

export default useNotif;
