import { RefSet3 } from '@src/hooks/useRefSet3';
import { WriterElements } from '../context/WriterElements';
import { Subject, fromEvent, takeUntil } from 'rxjs';

export class Writer {
    private destroy$: Subject<void>;
    private textArea: HTMLTextAreaElement;
    private content: HTMLDivElement;

    constructor(
        refs: RefSet3<WriterElements>
    ) {
        if (!refs.textArea || !refs.content) {
            throw new Error(
                'Writer was initialized with invalid references.'
            );
        }

        this.destroy$ = new Subject();

        this.textArea = refs.textArea;
        this.content = refs.content;
        this.bindListeners();
        this.subscribeEvents();
    }

    cleanup() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private bindListeners() {
        this.handleContentClick = this.handleContentClick.bind(this);
    }

    private subscribeEvents() {
        fromEvent<MouseEvent>(this.content, 'click')
            .pipe(takeUntil(this.destroy$))
            .subscribe((e) => this.handleContentClick(e));

        fromEvent<FocusEvent>(this.textArea, 'focus')
            .pipe(takeUntil(this.destroy$))
            .subscribe((e) => this.handleTextAreaFocus(e));

        fromEvent<Event>(this.textArea, 'input')
            .pipe(takeUntil(this.destroy$))
            .subscribe((e) => this.handleTextAreaInput(e));
    }

    private handleContentClick(_: MouseEvent) {
        this.textArea.focus();
    }

    private handleTextAreaFocus(_: FocusEvent) {
    }

    private handleTextAreaInput(_: Event) {
        console.log(this.textArea.value);
    }
}