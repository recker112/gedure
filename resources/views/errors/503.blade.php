@extends('errors::minimal')

@section('title', __('Mantenimiento'))
@section('code', '503')
@section('message', __($exception->getMessage() ?: 'La página está en mantenimiento'))
