/// <reference path="packages.d.ts"/>

import OrionChatEntity from 'packages/Chat/src/OrionChatEntity';
import OrionChatMessageEntity from 'packages/ChatMessage/src/OrionChatMessageEntity';
import { ChatService } from 'services/ChatService';
import { Component, Slot } from 'vue';
import { RouteLocationRaw, Router } from 'vue-router';
import { coolicons } from '../assets/fonts/coolicons';
import { useValidation } from '../services/index';

declare global {
	type Nullable<T> = T | null;

	type Undef<T> = T | undefined;

	type Nil<T> = T | undefined | null;

	type RefDom<T = HTMLElement> = undefined | HTMLElement & T;

	type SetupProps<T> = Readonly<import('vue').ExtractPropTypes<T>>

	type OrionValidatorRule = ReturnType<ReturnType<typeof useValidation>['rule']>;

	type OrionValidatorMessages = Partial<{
		[key in keyof ReturnType<typeof useValidation>['rulesRegistry']]: string;
	}>

	type AsideAnimationHookType =
	| 'asideEnterBefore'
	| 'asideEnterStart'
	| 'asideEnterEnd'
	| 'asideLeaveBefore'
	| 'asideLeaveStart'
	| 'asideLeaveEnd'
	;

	type ModalAnimationHookType =
	| 'modalEnterBefore'
	| 'modalEnterStart'
	| 'modalEnterEnd'
	| 'modalLeaveBefore'
	| 'modalLeaveStart'
	| 'modalLeaveEnd'
	;

	type NotifAnimationHookType =
	| 'notifEnterBefore'
	| 'notifEnterStart'
	| 'notifEnterEnd'
	| 'notifLeaveBefore'
	| 'notifLeaveStart'
	| 'notifLeaveEnd'
	;

	namespace Orion {
		type AppServiceConfig = {
			prefix: string;
			use: ('components' | 'monkeyPatching')[];
			lang: keyof typeof import('../lang')['default'];
			router: Router;
			popableAnimationHooks:
				& Record<AsideAnimationHookType, (instance?: OrionAside) => Promise<void>>
				& Record<ModalAnimationHookType, (instance?: OrionModal) => Promise<void>>
				& Record<NotifAnimationHookType, (instance?: OrionNotif) => Promise<void>>
		}

		type Config = Partial<AppServiceConfig>

		type Icon = typeof coolicons[number];

		type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

		type Color = 'brand' | 'default' | 'info' | 'success' | 'warning' | 'danger' | 'inverse' | 'pink';

		type ColorAlt = 'brand-alt' | 'info-alt' | 'success-alt' | 'warning-alt' | 'danger-alt' | 'pink-alt';

		type ColorExtended = Color | ColorAlt;

		type Grey = 'grey-darker' | 'grey-dark' | 'grey' | 'grey-light' |'grey-lighter';

		type DatepickerType = 'date' | 'range' | 'week';

		type Phone = {
			phoneNumber?: Nil<string>;
			phoneCountryCode?: Nil<Orion.Country['code']>;
		}

		type DateRange = {
			start?: Date;
			end?: Date;
			weekNumber?: number;
			year?: number;
			selecting?: boolean;
		}

		type DailyCalendarTask = {
			id: number;
			start: Date;
			end: Date;
			title: string;
			color: Orion.Color;
			column?: number;
			callback?: (task: DailyCalendarTask) => void;
		}

		type DndData = {
			data: Object & { __uid: number };
			from: number;
			to: Nullable<number>;
			index: Nullable<number>;
			canDrop: boolean;
			fromAsideOrModal: Nullable<Number>;
		}

		type DndValidation = {
			method: (payload: DndData) => boolean;
			notif: (payload: any) => void;
		}

		type Period = {
			isStart: boolean;
			isEnd: boolean;
			start: Date;
			end: Date;
			label: string;
			color: Orion.Color;
			callback?: () => void;
			specific: {
				color: Orion.Color
				date: Date;
				exclude: boolean;
			}[];
		}

		type Country = {
			code: Uppercase<`${Private.Letter}${Private.Letter}`>;
			name: string;
			areaCode: string;
		}

		type LayoutConfig = {
			navMain?: OrionNavMain.Props;
			navTop?: OrionNavTop.Props;
			navTabs?: OrionNavTabs.Props;
		}

		type List<T> = Omit<OrionList.Props, 'list' | 'selected'> & {
			list: T[];
			selected?: T[];
		}

		type ListPage = {
			size: number;
			index: number;
		}

		type ChatConfig = {
			user: ChatUser;
			allowMessageStatus: boolean;
			allowDiscussionCreation: boolean;
			allowDiscussionSearch: boolean;
			discussionSearchTimer: number;
			// eslint-disable-next-line max-len
			discussionFetcher?: (params: { oldestDiscussionId?: number, oldestDiscussionUpdatedDate?: Date, searchTerm: Nil<string>, searchTermHasChanged: boolean }) => Promise<Orion.ChatDiscussion[]>;
			discussionTitleFormatter?: (discussion: OrionChatEntity) => string;
			discussionInterlocutorsFormatter?: (discussion: OrionChatEntity) => ChatUser[];
			discussionUnreadMessagesCounter?: (params: {discussion: OrionChatEntity, discussionId: number, messages: OrionChatMessageEntity[] }) => number;
			messageFetcher: (params: { discussion: OrionChatEntity, discussionId: number, oldestMessageId?: number }) => Promise<Orion.ChatMessage[]>;
			onMessageRead: (message: OrionChatMessageEntity) => void;
			onNewMessage: (message: OrionChatMessageEntity) => void;
			onActiveDiscussionChange: (discussionId: number, oldDiscussionId: number) => void;
		}

		type ChatOptions = Partial<ChatConfig> & {
			user: ChatUser;
		};

		type ChatUser = {
			id: number;
			name: string;
			avatar: string;
			avatarProps?: Record<string, any>;
		};

		type ChatDiscussion = {
			id: number;
			createdDate: Date;
			updatedDate: Date;
			participants: ChatUser[];
			lastMessage: Undef<ChatMessage>;
			messages: ChatMessage[];
		}

		type ChatMessage = {
			discussionId: number;
			id: number;
			content: string;
			createdDate: Date;
			updatedDate: Nullable<Date>;
			deletedDate: Nullable<Date>;
			type?: number | string;
			metaData?: string | Record<string, any>;
			author: ChatUser;
			isRead: boolean;
		}

		type ChatNewMessage = {
			message: string;
			discussionId: number;
		}

		type ChatEntity = InstanceType<typeof OrionChatEntity>;

		type ChatService = InstanceType<typeof ChatService>;

		type NavItem = Partial<{
			always: boolean;
			backLabel: string;
			callback: () => any;
			children: NavItem[];
			class: string;
			expand: boolean;
			fontIcon: string;
			icon: Orion.Icon;
			id: string;
			if: boolean | (() => boolean);
			label: string;
			line: boolean;
			parent: NavItem;
			reload: boolean;
			replace: boolean;
			root: boolean;
			sectionTitle: boolean;
			showCarret: boolean;
			tag: string;
			to: RouteLocationRaw;
			wrapperClass: string;
		}>

		type NavSection = {
			slug: string;
			items: NavItem[];
			if?: boolean | (() => boolean);
		}

		namespace Popable {
			type Name = 'OrionAside' | 'OrionModal' | 'OrionNotif';

			type Options = {
				uid: number;
				Nested: Component | null;
				NestedProps: Record<string, any>;
				customClass: string;
				programmatic: boolean;
				openauto: boolean;
				size: string;
				hideClose: boolean;
				hideOnOverlayClick: boolean;
				hideOnEsc: boolean;
				overlay: boolean;
				zIndex: number;
				events?: Record<string, (popable: OrionAside | OrionModal | OrionNotif, params: any) => void>;
			};

			type CloseOptions = {
				keepInQueue?: boolean;
				handleQueue?: boolean;
				flush?: boolean;
			};
		}

		namespace Aside {
			type Options = Popable.Options & {
				events?: Record<string, (aside: OrionAside, params: any) => void>;
			}
		}

		namespace Modal {
			type Options = Popable.Options & {
				title: Nil<string>;
				message: Nil<string>;
				events?: Record<string, (modal: OrionModal, params: any) => void>;
				actions?: Partial<ActionsParams>[];
				prompt?: Partial<Prompt>;
			};

			type ActionsParams = OrionButton.Props & {
				label: string;
				callback: (modal: OrionModal, prompt?: Prompt) => void;
			}

			type PromptType = 'input' | 'textarea' | 'password' | 'select' | 'phone' | 'upload' | 'datepicker';

			type Prompt<T = any> = {
				type: PromptType;
				value: Nil<T>;
				fieldProps: Partial<OrionField.Props> & Record<string, any>;
				confirm(): void;
				cancel(): void;
			}

			type PromptResolveType<T> = {
				confirm: boolean;
				value: Nil<T>;
				modal: OrionModal;
			}
		}

		namespace Notif {
			type Options = Popable.Options & {
				title: Nil<string>;
				message: Nil<string>;
				duration?: Nil<number>;
				icon?: Orion.Icon;
				fontIcon?: string;
				color?: 'info' | 'success' | 'warning' | 'danger' ;
				events?: Record<string, (notif: OrionNotif, params: any) => void>;
			};
		}

		namespace Private {
			type Number = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

			type Letter = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i'
				| 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r'
				| 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z';

			type TsxTabPane = {
				props: OrionTabPane.Props & {
					'font-icon': string;
					'marker-color': string;
				};
				children: {
					default: Slot;
					label?: Slot;
				};
			}

			type TsxTimelinePane = {
				props: OrionTimelinePane.Props & {
					'font-icon': string;
					'marker-color': string;
				};
				children: {
					default: Slot;
					after?: Slot;
					before?: Slot;
				};
			}

			type TsxTourStep = {
				props : OrionTourStep.Props
			}
		}
	}
}
