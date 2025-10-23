import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  OnDestroy,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-code-display',
  imports: [CommonModule],
  template: `
    <div class="code-display-container">
      <div
        class="ui-section"
        [class.fluid-container]="hasFluidComponents"
        #uiContent
      >
        <ng-content></ng-content>
      </div>
      <div class="code-section">
        <div class="code-header">
          <span class="code-title">HTML</span>
          <button class="copy-button" (click)="copyCode()" title="Copy code">
            <i class="pi pi-copy"></i>
          </button>
        </div>
        <div class="code-block">
          <pre><code [innerHTML]="formattedCode"></code></pre>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./code-display.component.scss'],
})
export class CodeDisplayComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() sourceCode: string = '';
  @ViewChild('uiContent', { static: false }) uiContent!: ElementRef;

  formattedCode: string = '';
  rawSourceCode: string = '';
  hasFluidComponents: boolean = false;
  private observer: MutationObserver | null = null;

  ngOnInit() {
    if (this.sourceCode) {
      this.rawSourceCode = this.sourceCode;
      this.formattedCode = this.formatSourceCode(this.sourceCode);
      this.detectFluidButtons();
    }
  }

  ngAfterViewInit() {
    // Check for fluid buttons in the content
    this.detectFluidButtons();

    if (!this.sourceCode) {
      // Fallback: generate code from DOM if no source code provided
      this.generateCode();
      this.setupMutationObserver();
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private detectFluidButtons() {
    // Check if sourceCode contains fluid="true" or [fluid]="true"
    if (this.sourceCode) {
      this.hasFluidComponents =
        this.sourceCode.includes('fluid]="true"') ||
        this.sourceCode.includes('fluid="true"');
    } else {
      // Check DOM for fluid buttons
      setTimeout(() => {
        if (this.uiContent?.nativeElement) {
          const fluidButtons = this.uiContent.nativeElement.querySelectorAll(
            'i-button[ng-reflect-fluid="true"]'
          );
          this.hasFluidComponents = fluidButtons.length > 0;
        }
      }, 0);
    }
  }

  private setupMutationObserver() {
    this.observer = new MutationObserver(() => {
      this.generateCode();
    });

    this.observer.observe(this.uiContent.nativeElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeOldValue: true,
    });
  }

  private generateCode() {
    if (!this.uiContent?.nativeElement) return;

    const htmlContent = this.uiContent.nativeElement.innerHTML;
    this.formattedCode = this.formatHtml(htmlContent);
  }

  private formatSourceCode(sourceCode: string): string {
    // Store the raw source code
    this.rawSourceCode = sourceCode;

    // Apply syntax highlighting to the source code
    return this.applySyntaxHighlighting(sourceCode);
  }

  private formatHtml(html: string): string {
    // Clean up the HTML and format it properly
    html = html.trim();

    // Remove Angular generated attributes and comments
    html = html.replace(/<!--[\s\S]*?-->/g, '');
    html = html.replace(/\s+ng-reflect-\w+="[^"]*"/g, '');
    html = html.replace(/\s+_ngcontent-[^=]*="[^"]*"/g, '');
    html = html.replace(/\s+_nghost-[^=]*="[^"]*"/g, '');

    // Format the HTML with proper indentation
    const formatted = this.prettifyHtml(html);

    // Apply syntax highlighting
    return this.applySyntaxHighlighting(formatted);
  }

  private prettifyHtml(html: string): string {
    let result = '';
    let indent = 0;
    const tab = '  ';

    // Split by tags while preserving the tags
    const tokens = html.split(/(<[^>]*>)/);

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i].trim();
      if (!token) continue;

      if (token.startsWith('<')) {
        if (token.startsWith('</')) {
          // Closing tag - decrease indent
          indent = Math.max(0, indent - 1);
          result += tab.repeat(indent) + token + '\n';
        } else if (token.endsWith('/>')) {
          // Self-closing tag
          result += tab.repeat(indent) + token + '\n';
        } else {
          // Opening tag - add current indent then increase
          result += tab.repeat(indent) + token + '\n';
          indent++;
        }
      } else {
        // Text content
        if (token) {
          result += tab.repeat(indent) + token + '\n';
        }
      }
    }

    return result.trim();
  }

  private applySyntaxHighlighting(code: string): string {
    // Simply escape HTML and apply basic highlighting
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

    // Apply syntax highlighting with careful ordering
    return (
      highlighted
        // 1. Angular property bindings like [severity]="value"
        .replace(
          /(\[[\w-]+\])(=)(&quot;[^&quot;]*&quot;)/g,
          '<span class="angular-binding">$1</span>$2<span class="html-attr-value">$3</span>'
        )

        // 2. Angular event bindings like (click)="value"
        .replace(
          /(\([\w-]+\))(=)(&quot;[^&quot;]*&quot;)/g,
          '<span class="angular-event">$1</span>$2<span class="html-attr-value">$3</span>'
        )

        // 3. Opening HTML tags like <i-button
        .replace(
          /(&lt;)([a-zA-Z][\w-]*)/g,
          '<span class="html-tag">$1$2</span>'
        )

        // 4. Closing tags like >
        .replace(/(&gt;)/g, '<span class="html-tag">$1</span>')

        // 5. Self-closing tag endings like />
        .replace(/(\/&gt;)/g, '<span class="html-tag">$1</span>')

        // 6. Angular interpolation like {{value}}
        .replace(
          /({{[^}]*}})/g,
          '<span class="angular-interpolation">$1</span>'
        )
    );
  }

  copyCode() {
    let codeToCopy = '';

    if (this.sourceCode && this.rawSourceCode) {
      // Use the original source code if provided
      codeToCopy = this.rawSourceCode;
    } else {
      // Fallback: Get the raw HTML and clean it up for copying
      let htmlContent = this.uiContent.nativeElement.innerHTML;

      // Remove Angular generated attributes and comments
      htmlContent = htmlContent.replace(/<!--[\s\S]*?-->/g, '');
      htmlContent = htmlContent.replace(/\s+ng-reflect-\w+="[^"]*"/g, '');
      htmlContent = htmlContent.replace(/\s+_ngcontent-[^=]*="[^"]*"/g, '');
      htmlContent = htmlContent.replace(/\s+_nghost-[^=]*="[^"]*"/g, '');

      // Format it nicely
      codeToCopy = this.prettifyHtml(htmlContent);
    }

    navigator.clipboard.writeText(codeToCopy).then(() => {
      // Could add a toast notification here
      console.log('Code copied to clipboard');
    });
  }
}
