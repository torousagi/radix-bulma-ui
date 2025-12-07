import { forwardRef, useId, useState, useMemo, useRef, useEffect } from 'react'
import * as RadixPopover from '@radix-ui/react-popover'

export const Combobox = forwardRef(function Combobox(
  {
    label,
    options = [],
    value,
    onChange,
    onSearchChange,
    error,
    placeholder = '選択してください',
    searchPlaceholder = '検索...',
    emptyMessage = '該当する項目がありません',
    className = '',
    disabled = false,
    loading = false,
    clearable = false,
    // 非同期検索用
    async = false,
    ...props
  },
  ref
) {
  const generatedId = useId()
  const inputId = `combobox-${generatedId}`
  const listboxId = `combobox-listbox-${generatedId}`
  const errorId = error ? `combobox-error-${generatedId}` : undefined

  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  // 選択中のオプション
  const selectedOption = useMemo(
    () => options.find((opt) => opt.value === value),
    [options, value]
  )

  // フィルタリング（async モードでは外部でフィルタ済みを想定）
  const filteredOptions = useMemo(() => {
    if (async || !search) return options
    const lowerSearch = search.toLowerCase()
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(lowerSearch)
    )
  }, [options, search, async])

  // 検索テキスト変更
  const handleSearchChange = (e) => {
    const text = e.target.value
    setSearch(text)
    setHighlightedIndex(-1)
    onSearchChange?.(text)
  }

  // オプション選択
  const handleSelect = (option) => {
    onChange?.(option.value)
    setOpen(false)
    setSearch('')
    setHighlightedIndex(-1)
  }

  // クリア
  const handleClear = (e) => {
    e.stopPropagation()
    onChange?.(null)
    setSearch('')
  }

  // キーボード操作
  const handleKeyDown = (e) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setOpen(true)
        e.preventDefault()
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex])
        }
        break
      case 'Escape':
        setOpen(false)
        setSearch('')
        break
    }
  }

  // ハイライト位置をスクロール
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightedIndex]
      item?.scrollIntoView({ block: 'nearest' })
    }
  }, [highlightedIndex])

  // ポップオーバーが開いたら入力欄にフォーカス
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  return (
    <div className={`field ${className}`}>
      {label && <label className="label" htmlFor={inputId}>{label}</label>}
      <div className="control">
        <RadixPopover.Root open={open} onOpenChange={setOpen}>
          <RadixPopover.Trigger asChild>
            <button
              ref={ref}
              type="button"
              id={inputId}
              className={`button is-fullwidth combobox-trigger ${error ? 'is-danger' : ''}`}
              disabled={disabled}
              aria-invalid={error ? true : undefined}
              aria-describedby={errorId}
              aria-haspopup="listbox"
              aria-expanded={open}
              {...props}
            >
              <span className="combobox-value">
                {selectedOption?.label || placeholder}
              </span>
              <span className="combobox-icons">
                {clearable && value && (
                  <span
                    className="combobox-clear"
                    onClick={handleClear}
                    role="button"
                    aria-label="クリア"
                  >
                    ✕
                  </span>
                )}
                <span className="combobox-arrow">▼</span>
              </span>
            </button>
          </RadixPopover.Trigger>
          <RadixPopover.Portal>
            <RadixPopover.Content
              className="combobox-content"
              sideOffset={5}
              align="start"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <div className="combobox-search">
                <input
                  ref={inputRef}
                  type="text"
                  className="input"
                  placeholder={searchPlaceholder}
                  value={search}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  role="combobox"
                  aria-controls={listboxId}
                  aria-expanded={open}
                  aria-activedescendant={
                    highlightedIndex >= 0
                      ? `${listboxId}-option-${highlightedIndex}`
                      : undefined
                  }
                />
              </div>
              <ul
                ref={listRef}
                id={listboxId}
                className="combobox-list"
                role="listbox"
              >
                {loading ? (
                  <li className="combobox-item combobox-loading">
                    読み込み中...
                  </li>
                ) : filteredOptions.length === 0 ? (
                  <li className="combobox-item combobox-empty">
                    {emptyMessage}
                  </li>
                ) : (
                  filteredOptions.map((option, index) => (
                    <li
                      key={option.value}
                      id={`${listboxId}-option-${index}`}
                      className={`combobox-item ${
                        option.value === value ? 'is-selected' : ''
                      } ${index === highlightedIndex ? 'is-highlighted' : ''}`}
                      role="option"
                      aria-selected={option.value === value}
                      onClick={() => handleSelect(option)}
                      onMouseEnter={() => setHighlightedIndex(index)}
                    >
                      <span className="combobox-item-label">{option.label}</span>
                      {option.value === value && (
                        <span className="combobox-item-check">✓</span>
                      )}
                    </li>
                  ))
                )}
              </ul>
              <RadixPopover.Arrow className="combobox-arrow-indicator" />
            </RadixPopover.Content>
          </RadixPopover.Portal>
        </RadixPopover.Root>
      </div>
      {error && <p id={errorId} className="help is-danger" role="alert">{error}</p>}
    </div>
  )
})

// 複数選択対応
export const MultiCombobox = forwardRef(function MultiCombobox(
  {
    label,
    options = [],
    value = [],
    onChange,
    onSearchChange,
    error,
    placeholder = '選択してください',
    searchPlaceholder = '検索...',
    emptyMessage = '該当する項目がありません',
    className = '',
    disabled = false,
    loading = false,
    async = false,
    maxDisplayItems = 3,
    ...props
  },
  ref
) {
  const generatedId = useId()
  const inputId = `multi-combobox-${generatedId}`
  const listboxId = `multi-combobox-listbox-${generatedId}`
  const errorId = error ? `multi-combobox-error-${generatedId}` : undefined

  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const inputRef = useRef(null)

  // 選択中のオプション
  const selectedOptions = useMemo(
    () => options.filter((opt) => value.includes(opt.value)),
    [options, value]
  )

  // フィルタリング
  const filteredOptions = useMemo(() => {
    if (async || !search) return options
    const lowerSearch = search.toLowerCase()
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(lowerSearch)
    )
  }, [options, search, async])

  // 検索テキスト変更
  const handleSearchChange = (e) => {
    const text = e.target.value
    setSearch(text)
    onSearchChange?.(text)
  }

  // オプション選択/解除
  const handleToggle = (option) => {
    const isSelected = value.includes(option.value)
    const newValue = isSelected
      ? value.filter((v) => v !== option.value)
      : [...value, option.value]
    onChange?.(newValue)
  }

  // タグを削除
  const handleRemoveTag = (e, optionValue) => {
    e.stopPropagation()
    onChange?.(value.filter((v) => v !== optionValue))
  }

  // 表示テキスト
  const displayText = () => {
    if (selectedOptions.length === 0) return placeholder
    if (selectedOptions.length <= maxDisplayItems) {
      return selectedOptions.map((o) => o.label).join(', ')
    }
    return `${selectedOptions.length}件選択中`
  }

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  return (
    <div className={`field ${className}`}>
      {label && <label className="label" htmlFor={inputId}>{label}</label>}
      <div className="control">
        <RadixPopover.Root open={open} onOpenChange={setOpen}>
          <RadixPopover.Trigger asChild>
            <button
              ref={ref}
              type="button"
              id={inputId}
              className={`button is-fullwidth combobox-trigger ${error ? 'is-danger' : ''}`}
              disabled={disabled}
              aria-invalid={error ? true : undefined}
              aria-describedby={errorId}
              aria-haspopup="listbox"
              aria-expanded={open}
              {...props}
            >
              <span className="combobox-value">{displayText()}</span>
              <span className="combobox-arrow">▼</span>
            </button>
          </RadixPopover.Trigger>
          <RadixPopover.Portal>
            <RadixPopover.Content
              className="combobox-content"
              sideOffset={5}
              align="start"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <div className="combobox-search">
                <input
                  ref={inputRef}
                  type="text"
                  className="input"
                  placeholder={searchPlaceholder}
                  value={search}
                  onChange={handleSearchChange}
                />
              </div>
              {selectedOptions.length > 0 && (
                <div className="combobox-tags">
                  {selectedOptions.map((opt) => (
                    <span key={opt.value} className="tag is-primary">
                      {opt.label}
                      <button
                        type="button"
                        className="delete is-small"
                        onClick={(e) => handleRemoveTag(e, opt.value)}
                      />
                    </span>
                  ))}
                </div>
              )}
              <ul id={listboxId} className="combobox-list" role="listbox" aria-multiselectable="true">
                {loading ? (
                  <li className="combobox-item combobox-loading">読み込み中...</li>
                ) : filteredOptions.length === 0 ? (
                  <li className="combobox-item combobox-empty">{emptyMessage}</li>
                ) : (
                  filteredOptions.map((option) => {
                    const isSelected = value.includes(option.value)
                    return (
                      <li
                        key={option.value}
                        className={`combobox-item ${isSelected ? 'is-selected' : ''}`}
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleToggle(option)}
                      >
                        <span className="combobox-item-checkbox">
                          {isSelected ? '☑' : '☐'}
                        </span>
                        <span className="combobox-item-label">{option.label}</span>
                      </li>
                    )
                  })
                )}
              </ul>
              <RadixPopover.Arrow className="combobox-arrow-indicator" />
            </RadixPopover.Content>
          </RadixPopover.Portal>
        </RadixPopover.Root>
      </div>
      {error && <p id={errorId} className="help is-danger" role="alert">{error}</p>}
    </div>
  )
})

Combobox.Multi = MultiCombobox
