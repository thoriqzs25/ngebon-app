import React from 'react';
import { NavigationContainerRef, ParamListBase } from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef<ParamListBase>>();
export const isReadyRef = React.createRef();

export const navigate = (name: string, params?: object | undefined, merge?: boolean) => {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.navigate({ name: name, params: params, merge: merge });
  } else {
    try {
      navigationRef.current?.navigate({ name: name, params: params, merge: merge });
    } catch (error) {
      console.log('[Navigation]', 'navigate error', error);
    }
  }
};

export const getRouteName = () => {
  let routeName = 'Unknown';
  if (isReadyRef.current && navigationRef.current) {
    routeName = navigationRef.current?.getCurrentRoute()?.name || 'Unknown';
  } else {
    try {
      routeName = navigationRef.current?.getCurrentRoute()?.name || 'Unknown';
    } catch (error) {
      console.log('[Navigation]', 'getRoute error', error);
    }
  }
  return routeName;
};
