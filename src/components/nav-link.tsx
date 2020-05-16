import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

export type NavLinkProps = LinkProps & {
  children: React.ReactElement;
  activeClassName?: string;
};

export const NavLink = function NavLink({
  children,
  activeClassName,
  ...props
}: NavLinkProps) {
  const { pathname } = useRouter();

  const child = React.Children.only(children);

  const className =
    activeClassName && pathname === props.href
      ? `${child.props.className} ${activeClassName}`
      : child.props.className;

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};
