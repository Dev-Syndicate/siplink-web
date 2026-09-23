import Link from "next/link";
import { Check, Minus } from "lucide-react";

import {
  internetComparisonBestFor,
  internetComparisonColumns,
  internetComparisonRows,
} from "@/lib/internet";

/**
 * The service comparison from docs/INTERNET.md.
 *
 * Two deliberate choices. First, qualified answers are printed as written —
 * "Plan dependent" is the honest answer for contended broadband, and
 * rounding it up to a tick would be the one thing a comparison table must
 * never do. Second, the table scrolls horizontally on small screens rather
 * than collapsing into five stacked cards: the whole value of this block is
 * reading across a row, and a stack destroys exactly that.
 */
export function ComparisonMatrix() {
  return (
    <div className="-mx-6 overflow-x-auto px-6 lg:mx-0 lg:px-0">
      <table className="w-full min-w-[46rem] border-collapse text-left">
        <caption className="sr-only">
          How SipLink internet and network services compare across common
          business requirements
        </caption>

        <thead>
          <tr>
            <th
              scope="col"
              className="w-[15rem] border-b border-border pb-4 align-bottom font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase"
            >
              Requirement
            </th>
            {internetComparisonColumns.map(({ href, label }) => (
              <th
                scope="col"
                key={label}
                className="border-b border-border px-3 pb-4 align-bottom"
              >
                <Link
                  href={href}
                  className="text-sm font-semibold tracking-tight text-balance transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none"
                >
                  {label}
                </Link>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {internetComparisonRows.map(({ requirement, values }) => (
            <tr
              key={requirement}
              className="border-b border-border transition-colors hover:bg-muted/40"
            >
              <th
                scope="row"
                className="py-3.5 pr-4 text-sm font-normal text-muted-foreground"
              >
                {requirement}
              </th>

              {values.map((value, index) => (
                <td
                  key={internetComparisonColumns[index].label}
                  className="px-3 py-3.5 text-sm"
                >
                  {value === true ? (
                    <>
                      <Check className="size-4 text-primary" aria-hidden />
                      <span className="sr-only">Included</span>
                    </>
                  ) : value === false ? (
                    <>
                      <Minus
                        className="size-4 text-muted-foreground/40"
                        aria-hidden
                      />
                      <span className="sr-only">Not applicable</span>
                    </>
                  ) : (
                    <span className="text-muted-foreground">{value}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}

          <tr>
            <th
              scope="row"
              className="py-4 pr-4 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase"
            >
              Best suited for
            </th>
            {internetComparisonBestFor.map((item) => (
              <td key={item} className="px-3 py-4 text-sm font-medium text-balance">
                {item}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
