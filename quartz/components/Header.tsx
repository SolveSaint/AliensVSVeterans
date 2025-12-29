import {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "./types"

const Header: QuartzComponent = ({ children }: QuartzComponentProps) => {
  if (children.length === 0) return null

  return (
    <header>
      <h1 className="avv-logo">
        <span className="avv-aliens">Aliens</span>
        <span className="avv-vs"> VS </span>
        <span className="avv-veterans">Veterans</span>
      </h1>
      {children}
    </header>
  )
}

Header.css = `
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 2rem 0;
  gap: 1.5rem;
}

header h1 {
  margin: 0;
  white-space: nowrap;
}

/* AVV logo styling */
.avv-logo {
  font-weight: 600;
  letter-spacing: 0.01em;
}

/* Reuse existing palette */
.avv-logo .avv-aliens {
  color: #c43c3c;
  text-shadow: 0 0 14px rgba(196, 60, 60, 0.45);
}

.avv-logo .avv-vs {
  color: #ffffff;
  opacity: 0.95;
}

.avv-logo .avv-veterans {
  color: #1f4ed8;
  text-shadow: 0 0 14px rgba(31, 78, 216, 0.45);
}
`

export default (() => Header) satisfies QuartzComponentConstructor
