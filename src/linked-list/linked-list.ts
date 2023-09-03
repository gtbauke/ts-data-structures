type LinkedListNode<T> = {
    value: T;
    next: LinkedListNode<T> | null;
};

export class IndexOutOfBounds extends Error {
    public constructor(index: number, length: number) {
        super(`Index ${index} is out of bounds. Container has length ${length}`);
    }
}

export class LinkedList<T> {
    private head: LinkedListNode<T> | null;
    
    public length = 0;
    
    public constructor(value: T | null = null) {
        this.head = value ? { value, next: null } : null;
    }
    
    public static from<A>(container: ArrayLike<A>): LinkedList<A> {
        const list = new LinkedList<A>();
        const array = Array.from(container);
        
        for (const elem of array) {
            list.append(elem);
        }
        
        return list;
    }
    
    public append(value: T): this {
        if (!this.head) {
            this.head = { value, next: null };
            this.length++;
            
            return this;
        }
        
        const node = { value, next: null };
        let pointer = this.head;
        
        while (pointer.next) {
            pointer = pointer.next;
        }
        
        pointer.next = node;
        this.length++;
        
        return this;
    }
    
    public prepend(value: T): this {
        if (!this.head) {
            this.head = { value, next: null };
            this.length++;
            
            return this;
        }
        
        const tail = this.head;
        this.head = { value, next: tail };
        this.length++;
        
        return this;
    }
    
    /**
    * Inserts a value into a specified position in the linked list
    * @throws {IndexOutOfBounds} When the provided position is less than zero or greater or equal than the list length
    * @param value Value to be inserted in the linked list
    * @param at Index to insert new node
    * @returns The linked list with the new node inserted at the correct position
    */
    public insert(value: T, at: number): this {
        if (at >= this.length || at < 0) {
            throw new IndexOutOfBounds(at, this.length);
        }
        
        let before: LinkedListNode<T> | null = null;
        let pointer = this.head;
        let counter = 0;
        
        while (counter !== at) {
            counter++;
            before = pointer;
            pointer = pointer!.next;
        }
        
        const tail = pointer;
        const node = { value, next: tail };
        pointer = node;
        before!.next = pointer;
        
        return this;
    }
    
    public find(fn: (e: T) => boolean): T | null {
        let pointer = this.head;
        
        while (pointer) {
            if (fn(pointer.value)) {
                return pointer.value;
            }
            
            pointer = pointer.next;
        }
        
        return null;
    }

    public toString(): string {
        const str: T[] = [];
        
        let pointer = this.head;
        while (pointer) {
            str.push(pointer.value);
            pointer = pointer.next;
        }
        
        return str.join(", ");
    }
    
    public toArray(): T[] {
        const array: T[] = [];
        
        let pointer = this.head;
        while (pointer) {
            array.push(pointer.value);
            pointer = pointer.next;
        }
        
        return array;
    }
}
