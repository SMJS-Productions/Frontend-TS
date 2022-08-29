import { AnyElement } from "../type/AnyElement.js";

/**
 * A class which attempts to make HTMLElements easier to use.
 * 
 * Since this class attempts to completely replace the `globalThis.HTMLElement` class, it uses the same name.
 * By default it will use the `globalThis.HTMLElement` class as generic type since it's compatible with all other elements.
 * @author Sjoerd Teijgeler
 * @version 1.0.0
 */
export class HTMLElement<T extends AnyElement = globalThis.HTMLElement> {

    /**
     * Gets an instance of HTMLElement holding the head element.
     */
    public static get head(): HTMLElement<HTMLHeadElement> {
        return new HTMLElement(document.head);
    }

    /**
     * Gets an instance of HTMLElement holding the body element.
     */
    public static get body(): HTMLElement<HTMLBodyElement> {
        return new HTMLElement(<HTMLBodyElement>document.body);
    }

    /**
     * @see Document.getElementById
     */
    public static getById<T extends AnyElement = globalThis.HTMLElement>(id: string): HTMLElement<T> {
        const element = document.getElementById(id);

        if (element) {
            return new HTMLElement(<T>element);
        } else {
            throw new Error(`Element with id ${id} not found`);
        }
    }

    /**
     * @see Document.querySelector<Element>
     */
    public static getByQuery<T extends AnyElement = globalThis.HTMLElement>(query: string): HTMLElement<T> {
        const element = document.querySelector(query);

        if (element) {
            return new HTMLElement(<T>element);
        } else {
            throw new Error(`Element with query ${query} not found`);
        }
    }

    /**
     * @see Document.querySelectorAll<Element>
     */
    public static getAllByQuery<T extends AnyElement = globalThis.HTMLElement>(query: string): HTMLElement<T>[] {
        return Array.from(document.querySelectorAll(query)).map((element) => new HTMLElement(<T>element));
    }

    /**
     * @see Document.getElementsByTagName<K>
     */
    public static getAllByTag<K extends keyof HTMLElementTagNameMap>(tag: K): HTMLElement<HTMLElementTagNameMap[K]>[] {
        return Array.from(document.getElementsByTagName(tag)).map(
            (element) => new HTMLElement(<HTMLElementTagNameMap[K]>element)
        );
    }

    /**
     * @see Document.getElementsByTagNameNS
     */
    public static getAllByTagNS<T extends AnyElement = globalThis.HTMLElement>(
        namespaceURI: "http://www.w3.org/1999/xhtml" | "http://www.w3.org/2000/svg" |  string,
        tag: string
    ): HTMLElement<T>[] {
        return Array.from(document.getElementsByTagNameNS(namespaceURI, tag)).map(
            (element) => new HTMLElement(<T>element)
        );
    }

    /**
     * @see Document.getElementsByClassName
     */
    public static getAllByClass<T extends AnyElement = globalThis.HTMLElement>(className: string): HTMLElement<T>[] {
        return Array.from(document.getElementsByClassName(className)).map(
            (element) => new HTMLElement(<T>element)
        );
    }

    /**
     * @see Document.getElementsByName
     */
    public static getAllByName<T extends AnyElement = globalThis.HTMLElement>(name: string): HTMLElement<T>[] {
        return Array.from(document.getElementsByName(name)).map(
            (element) => new HTMLElement(<T>element)
        );
    }

    /**
     * @see Document.createElement<K>
     * With property overrides on initialization.
     * @param tag The type of element to create.
     * @param properties The properties to overwrite on the element along with the standard create element properties.
     * @returns The newly created element.
     */
    public static create<K extends keyof HTMLElementTagNameMap>(
        tag: K,
        properties?: Partial<HTMLElementTagNameMap[K]> & ElementCreationOptions
    ): HTMLElement<HTMLElementTagNameMap[K]> {
        const element = new HTMLElement(document.createElement(tag, {
            is: properties?.is
        }));

        Object.assign(element.element, properties ?? {});

        return element;
    }

    /**
     * The old HTMLElement incase any unimplemented properties have to be used.
     */
    public readonly element: T;

    /**
     * Since a lot of DOM types falsely claim to return the really minimal Element type, a special overload is added to assume it's a HTMLElement.
     * @param element The old HTMLElement or Element to upgrade.
     */
    constructor(element: T | Element) {
        this.element = <T>element;
    }

    /**
     * @see globalThis.HTMLElement.prototype.id
     */
    public get id(): string | null {
        return this.element.id || null;
    }

    /**
     * @see globalThis.HTMLElement.prototype.id
     */
    public set id(id: string | null) {
        this.element.id = id ?? "";
    }

    /**
     * @see globalThis.HTMLElement.prototype.innerText
     */
    public get innerText(): string {
        return this.element.innerText;
    }

    /**
     * @see globalThis.HTMLElement.prototype.innerText
     */
    public set innerText(text: string) {
        this.element.innerText = text;
    }

    /**
     * @see globalThis.HTMLElement.prototype.innerHTML
     */
    public get innerHTML(): string {
        return this.element.innerHTML;
    }

    /**
     * @see globalThis.HTMLElement.prototype.innerHTML
     */
    public set innerHTML(html: string) {
        this.element.innerHTML = html;
    }

    /**
     * @see globalThis.HTMLElement.prototype.tabIndex
     */
    public get tabIndex(): number {
        return this.element.tabIndex;
    }

    /**
     * @see globalThis.HTMLElement.prototype.tabIndex
     */
    public set tabIndex(index: number) {
        this.element.tabIndex = index;
    }

    /**
     * @see globalThis.HTMLImageElement.prototype.src
     */
    public get src(): T extends { src: string } ? string | null : never {
        if ("src" in this.element) {
            return this.element.src || null;
        } else {
            throw new Error("Not a source element");
        }
    }

    /**
     * @see globalThis.HTMLImageElement.prototype.src
     */
    public set src(src: T extends { src: string } ? string | null : never) {
        if ("src" in this.element) {
            this.element.src = src ?? "";
        } else {
            throw new Error("Not a source element");
        }
    }

    /**
     * @see globalThis.HTMLLinkElement.prototype.href
     */
    public get href(): T extends { href: string } ? string | null : never {
        if ("href" in this.element) {
            return this.element.href || null;
        } else {
            throw new Error("Not a link element");
        }
    }

    /**
     * @see globalThis.HTMLLinkElement.prototype.href
     */
    public set href(href: T extends { href: string } ? string | null : never) {
        if ("href" in this.element) {
            this.element.href = href ?? "";
        } else {
            throw new Error("Not a link element");
        }
    }

    /**
     * @see globalThis.HTMLInputElement.prototype.value
     */
    public get value(): T extends { value: string } ? string | null : never {
        if ("value" in this.element) {
            return this.element.value || null;
        } else {
            throw new Error("Not a value element");
        }
    }

    /**
     * @see globalThis.HTMLInputElement.prototype.value
     */
    public set value(value: T extends { value: string } ? string | null : never) {
        if ("value" in this.element) {
            this.element.value = value ?? "";
        } else {
            throw new Error("Not a value element");
        }
    }

    /**
     * @see globalThis.HTMLElement.prototype.style
     */
    public get style(): T["style"] {
        return this.element.style;
    }

    /**
     * @see globalThis.HTMLElement.prototype.classList
     */
    public get classes(): T["classList"] {
        return this.element.classList;
    }

    /**
     * @see globalThis.HTMLElement.prototype.parentElement
     */
    public get parent(): HTMLElement<globalThis.HTMLElement> | null {
        return this.element.parentElement ? new HTMLElement(<T>this.element.parentElement) : null;
    }

    /**
     * @see globalThis.HTMLElement.prototype.children
     */
    public get children(): HTMLElement<globalThis.HTMLElement>[] {
        return Array.from(this.element.children).map((child) => new HTMLElement(child));
    }

    /**
     * @see globalThis.HTMLElement.prototype.addEventListener
     */
    public addEvent<K extends keyof HTMLElementEventMap>(
        event: K,
        callback: (event: HTMLElementEventMap[K]) => any,
        options?: boolean | AddEventListenerOptions
    ): void {
        this.element.addEventListener(event, <EventListener>callback, options);
    }

    /**
     * @see globalThis.HTMLElement.prototype.removeEventListener
     */
    public removeEvent<K extends keyof HTMLElementEventMap>(key: K, callback: (event: HTMLElementEventMap[K]) => any): void {
        this.element.removeEventListener(key, <EventListener>callback);
    }

    /**
     * @see globalThis.HTMLElement.prototype.dispatchEvent
     */
    public dispatchEvent(event: Event): boolean {
        return this.element.dispatchEvent(event);
    }

    /**
     * @see globalThis.HTMLElement.prototype.appendChild<T>
     */
    public appendChild<T extends AnyElement = globalThis.HTMLElement>(element: HTMLElement<T> | T): HTMLElement<T> {
        if (element instanceof HTMLElement) {
            this.element.appendChild(element.element);

            return element;
        } else {
            this.element.appendChild(element);

            return new HTMLElement(element);
        }
    }

    /**
     * @see globalThis.HTMLElement.prototype.removeChild<T>
     */
    public removeChild<T extends AnyElement = globalThis.HTMLElement>(element: HTMLElement<T> | T): HTMLElement<T> {
        return new HTMLElement(this.element.removeChild(element instanceof HTMLElement ? element.element : element));
    }

    /**
     * @see globalThis.HTMLElement.prototype.click
     */
    public click(): void {
        this.element.click();
    }

    /**
     * @see globalThis.HTMLElement.prototype.focus
     */
    public focus(options?: FocusOptions): void {
        this.element.focus(options);
    }

    /**
     * @see globalThis.HTMLElement.prototype.scrollIntoView
     */
    public scrollIntoView(options?: boolean | ScrollIntoViewOptions): void {
        this.element.scrollIntoView(options);
    }

    /**
     * @see globalThis.HTMLElement.prototype.querySelector<Element>
     */
    public getByQuery<T extends AnyElement = globalThis.HTMLElement>(query: string): HTMLElement<T> {
        const element = this.element.querySelector(query);

        if (element) {
            return new HTMLElement(<T>element);
        } else {
            throw new Error(`Element with query ${query} not found`);
        }
    }

    /**
     * @see globalThis.HTMLElement.prototype.querySelectorAll<Element>
     */
    public getAllByQuery<T extends AnyElement = globalThis.HTMLElement>(query: string): HTMLElement<T>[] {
        return Array.from(this.element.querySelectorAll(query)).map((element) => new HTMLElement(<T>element));
    }

    /**
     * @see globalThis.HTMLElement.prototype.getElementsByTagName<K>
     */
    public getAllByTag<K extends keyof HTMLElementTagNameMap>(tag: K): HTMLElement<HTMLElementTagNameMap[K]>[] {
        return Array.from(this.element.getElementsByTagName(tag)).map(
            (element) => new HTMLElement(<HTMLElementTagNameMap[K]>element)
        );
    }

    /**
     * @see Document.getElementsByTagNameNS
     */
    public getAllByTagNS<T extends AnyElement = globalThis.HTMLElement>(
        namespaceURI: "http://www.w3.org/1999/xhtml" | "http://www.w3.org/2000/svg" |  string,
        tag: string
    ): HTMLElement<T>[] {
        return Array.from(this.element.getElementsByTagNameNS(namespaceURI, tag)).map(
            (element) => new HTMLElement(<T>element)
        );
    }

    /**
     * @see globalThis.HTMLElement.prototype.getElementsByClassName
     */
    public getAllByClass<T extends AnyElement = globalThis.HTMLElement>(className: string): HTMLElement<T>[] {
        return Array.from(this.element.getElementsByClassName(className)).map(
            (element) => new HTMLElement(<T>element)
        );
    }

    /**
     * @see Document.createElement<K>
     * With property overrides on initialization. Afterwards the newly created element is appended to the current instance.
     * @param tag The type of element to create.
     * @param properties The properties to overwrite on the element along with the standard create element properties.
     * @returns The newly created element.
     */
    public createChild<K extends keyof HTMLElementTagNameMap>(
        tag: K,
        properties?: Partial<HTMLElementTagNameMap[K]>
    ): HTMLElement<HTMLElementTagNameMap[K]> {
        const element = new HTMLElement(document.createElement(tag));

        Object.assign(element.element, properties ?? {});

        return this.appendChild(element);
    }

    /**
     * Searches upwards through the tree structure for an element with the given ID.
     * @param id The ID to search for.
     * @returns The first element upwards in the tree structure with the ID.
     */
    public getAncestorById<T extends AnyElement = globalThis.HTMLElement>(id: string): HTMLElement<T> | null {
        return this.getAncestorByClassRecursive(id, "id", this.element);
    }

    /**
     * Searches upwards through the tree structure for an element with the given tag.
     * @param tag The tag to search for.
     * @returns The first element upwards in the tree structure with the tag.
     */
    public getAncestorByTag<K extends keyof HTMLElementTagNameMap>(tag: string): HTMLElement<HTMLElementTagNameMap[K]> | null {
        return this.getAncestorByClassRecursive(tag, "tagName", this.element);
    }

    /**
     * Searches upwards through the tree structure for an element with the given class.
     * @param className The class to search for.
     * @returns The first element upwards in the tree structure that has the class.
     */
    public getAncestorByClass<T extends AnyElement = globalThis.HTMLElement>(className: string): HTMLElement<T> | null {
        return this.getAncestorByClassRecursive(className, "classList", this.element);
    }

    private getAncestorByClassRecursive<K extends keyof globalThis.HTMLElement, T extends AnyElement = globalThis.HTMLElement>(
        condition: string,
        property: globalThis.HTMLElement[K] extends string | DOMTokenList ? K : never,
        element: globalThis.HTMLElement
    ): HTMLElement<T> | null {
        if (typeof element[property] == "string" && element[property] == condition) {
            return new HTMLElement(<T>element);
        } else if ("contains" in element[property] && (<DOMTokenList>element[property]).contains(condition)) {
            return new HTMLElement(<T>element);
        } else if (element.parentElement) {
            return this.getAncestorByClassRecursive(condition, property, element.parentElement);
        } else {
            return null;
        }
    }
}