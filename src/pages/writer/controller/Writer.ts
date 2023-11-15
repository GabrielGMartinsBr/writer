import { RefSet3 } from '@src/hooks/useRefSet3';
import {
    BehaviorSubject,
    Observable,
    Subject,
    debounce,
    distinctUntilChanged,
    fromEvent,
    takeUntil,
    timer
} from 'rxjs';
import { WriterElements } from '../context/WriterElements';
import { WriterRender } from './WriterRender';

export class Writer {
    private destroy$: Subject<void>;
    private focus$: BehaviorSubject<boolean>;

    private textArea: HTMLTextAreaElement;
    private content: HTMLDivElement;

    private render = new WriterRender();

    focusOutput: Observable<boolean>;

    constructor(
        refs: RefSet3<WriterElements>
    ) {
        if (!refs.textArea || !refs.content) {
            throw new Error(
                'Writer was initialized with invalid references.'
            );
        }

        this.destroy$ = new Subject();
        this.focus$ = new BehaviorSubject(false);

        this.focusOutput = this.createFocusObservable();

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

        fromEvent<FocusEvent>(this.textArea, 'blur')
            .pipe(takeUntil(this.destroy$))
            .subscribe((e) => this.handleTextAreaBlur(e));

        fromEvent<Event>(this.textArea, 'keydown')
            .pipe(takeUntil(this.destroy$))
            .subscribe((e) => this.handleTextAreaKeyDown(e));

        fromEvent<Event>(this.textArea, 'input')
            .pipe(takeUntil(this.destroy$))
            .subscribe((e) => this.handleTextAreaChange(e));
    }

    private handleContentClick(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        this.textArea.focus();
    }

    private handleTextAreaBlur(_: FocusEvent) {
        this.focus$.next(false);
    }

    private handleTextAreaFocus(_: FocusEvent) {
        this.focus$.next(true);
    }

    private handleTextAreaKeyDown(_: Event) {
        // console.log('keydown', this.textArea.value);
        // this.render.parseElements(this.render.nodes, 600);
        this.render.render(this.content);
    }

    private handleTextAreaChange(_: Event) {
        // console.log('input', this.textArea.value);
    }

    private createFocusObservable() {
        return this.focus$.pipe(
            takeUntil(this.destroy$),
            debounce(b => b ? timer(30) : timer(150)),
            distinctUntilChanged()
        );
    }
}