import { EVAPI } from '@ecovoit-api/mock-adapter';

export class APIError extends Error {
	public readonly type: string;
	public readonly title: string;
	public readonly status: number;
	public readonly detail: string;
	public readonly instance: string;

	constructor({ type, title, status, detail, instance }: EVAPI.Error) {
		super(title);
		this.type = type;
		this.title = title;
		this.status = status;
		this.detail = detail;
		this.instance = instance;
	}

	public override toString(): string {
		return `type: ${this.type}, title: ${this.title}, status: ${this.status}, detail: ${this.detail}, instance: ${this.instance}`;
	}

	public toJSON(): EVAPI.Error {
		return {
			type: this.type,
			title: this.title,
			status: this.status,
			detail: this.detail,
			instance: this.instance,
		};
	}
}

export default APIError;
