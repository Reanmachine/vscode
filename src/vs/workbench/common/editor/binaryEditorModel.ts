/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import {TPromise} from 'vs/base/common/winjs.base';
import {EditorModel} from 'vs/workbench/common/editor';
import {IFileService, IFileMetadata} from 'vs/platform/files/common/files';
import URI from 'vs/base/common/uri';

/**
 * An editor model that just represents a resource and mime for a resource that can be loaded.
 */
export class BinaryEditorModel extends EditorModel {
	private name: string;
	private resource: URI;
	private metadata: IFileMetadata;

	constructor(
		resource: URI,
		name: string,
		@IFileService private fileService: IFileService
	) {
		super();

		this.name = name;
		this.resource = resource;
	}

	/**
	 * The name of the binary resource.
	 */
	public getName(): string {
		return this.name;
	}

	/**
	 * The resource of the binary resource.
	 */
	public getResource(): URI {
		return this.resource;
	}

	/**
	 * The metadata of the binary resource.
	 */
	public getMetadata(): IFileMetadata {
		return this.metadata;
	}

	/**
	 * Causes this model to load returning a promise when loading is completed.
	 */
	public load(): TPromise<EditorModel> {
		return this
			.fileService
			.resolveMetadata(this.getResource())
			.then((metadata) => {
				this.metadata = metadata;

				return this;
			});
	}
}