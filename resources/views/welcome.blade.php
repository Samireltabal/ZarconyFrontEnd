@extends('layouts.app')
@section('title', 'Home')
@section('content')
    <div class="container-fluid">
        <div class="row">
            <zarcony-header />
        </div>
        <div class="row justify-content-center mt-2">
            <router-view></router-view>
        </div>
        <div class="clearfix"></div>
        <zarcony-footer />
    </div>
@endsection